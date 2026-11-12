/**
 * Utilitário centralizado do Meta Pixel.
 * - Inicializa o script uma única vez (guarda contra dupla inicialização).
 * - Expõe apenas PageView e ViewContent + evento personalizado CheckoutClick.
 * - NÃO envia Purchase nem InitiateCheckout — isso é responsabilidade da Kiwify.
 * - Em dev/teste: eventos são bloqueados, a menos que VITE_ENABLE_META_PIXEL=true.
 * - LGPD: eventos de marketing só disparam com consentimento (cookie lvd_meta_consent=opt-in).
 */

type FbqMethod =
  | 'track'
  | 'trackCustom'
  | 'init'
  | 'pageview'
  | 'load'
  | 'clear'
  | 'getLoaded'
  | 'set'
  | 'callMethod';

type FbqCall = FbqMethod | undefined;

interface FbqQueue {
  (...args: unknown[]): unknown;
  push: (method: FbqCall, ...args: unknown[]) => unknown;
  loaded: boolean;
  version: string;
  callMethod?: (...args: unknown[]) => unknown;
  queue: unknown[];
}

declare global {
  interface Window {
    fbq?: FbqQueue;
    _fbq?: FbqQueue;
  }
}

const PIXEL_ID: string = import.meta.env.VITE_META_PIXEL_ID ?? '3720871871393848';

const CONSENT_COOKIE_KEY = 'lvd_meta_consent';
const ENABLED_IN_DEV = (import.meta.env.VITE_ENABLE_META_PIXEL as string | undefined) === 'true';
const IS_PRODUCTION = import.meta.env.PROD;

let initialized = false;
let viewContentFired = false;

function getPixelId(): string {
  return PIXEL_ID;
}

/**
 * Cria o stub fbq e injeta o fbevents.js global, se ainda não existir.
 * Segura: só injeta o script uma vez; se window.fbq já existe, não refaz.
 */
function loadPixelScript(pixelId: string): void {
  if (typeof document === 'undefined') return;
  if (initialized) return;

  const w = window as Window;

  if (!w.fbq) {
    const factory = function (this: unknown, f: Window, b: Document, e: string, v: string, n: string, t: string) {
      if (f.fbq) return;
      const nfq: FbqQueue = function () {
        const args = arguments as unknown as unknown[];
        if (nfq.callMethod) {
          return nfq.callMethod.apply(nfq, args);
        }
        nfq.queue.push(args);
      } as unknown as FbqQueue;
      nfq.push = nfq;
      nfq.loaded = true;
      nfq.version = '2.0';
      nfq.queue = [];
      const s = b.createElement(e) as HTMLScriptElement;
      s.async = true;
      s.src = v;
      const first = b.getElementsByTagName(e)[0];
      if (first && first.parentNode) {
        first.parentNode.insertBefore(s, first);
      } else if (b.head) {
        b.head.appendChild(s);
      }
      w.fbq = nfq;
      w._fbq = nfq;
    };

    factory(w, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', 'fbq', 'n');
  }

  const fbq = w.fbq;
  if (!fbq) {
    initialized = false;
    return;
  }

  fbq('init', pixelId, {
    agent: 'lvd_lovable',
  });
  initialized = true;
}

/**
 * Rastreia um evento do Meta Pixel.
 * Verifica: produção/dev habilitado → consentimento → fbq existente.
 *
 * @param event — nome do evento oficial da Meta, ou "CheckoutClick" (personalizado).
 * @param params — payload opcional (ex.: content_name, value, currency).
 */
export function trackMetaEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!isEnabled()) return;
  if (!hasConsent()) return;

  const w = window as Window;
  if (!w.fbq || !w.fbq.loaded) return;

  if (event === 'PageView' || event === 'ViewContent') {
    w.fbq('track', event, params ?? {});
  } else {
    // Evento personalizado (ex.: CheckoutClick)
    w.fbq('trackCustom', event, params ?? {});
  }
}

/**
 * Dispara ViewContent apenas uma vez por sessão na página de vendas.
 */
export function trackViewContent(params?: Record<string, unknown>): void {
  if (viewContentFired) return;
  if (!isEnabled() || !hasConsent()) return;
  viewContentFired = true;
  trackMetaEvent('ViewContent', {
    content_name: 'Método Aprovado — Página de Vendas',
    ...params,
  });
}

/**
 * Dispara o evento personalizado CheckoutClick antes de redirecionar à Kiwify.
 * Nunca dispara Purchase nem InitiateCheckout.
 */
export function trackCheckoutClick(params?: Record<string, unknown>): void {
  trackMetaEvent('CheckoutClick', {
    content_name: 'Método Aprovado — CTA Comprar',
    ...params,
  });
}

/**
 * Clique em um botão que leva ao cadastro gratuito do Legislação Estratégica em Questões.
 * Dispara "Lead" (intenção de cadastro). O cadastro concluído é registrado pelo próprio
 * site, com CompleteRegistration, para não contar duas vezes.
 */
export function trackSignupClick(params?: Record<string, unknown>): void {
  trackMetaEvent('Lead', {
    content_name: 'Lei Seca em Questões — cadastro gratuito',
    content_category: 'cadastro_gratuito',
    ...params,
  });
}

function isEnabled(): boolean {
  if (IS_PRODUCTION) return true;
  return ENABLED_IN_DEV;
}

function hasConsent(): boolean {
  if (typeof document === 'undefined') return false;
  const cookies = document.cookie
    .split('; ')
    .map((pair) => {
      const idx = pair.indexOf('=');
      const k = idx === -1 ? pair : pair.slice(0, idx);
      return k;
    });
  if (cookies.includes(CONSENT_COOKIE_KEY)) {
    const value = document.cookie
      .split('; ')
      .find((pair) => pair.startsWith(CONSENT_COOKIE_KEY + '='))
      ?.split('=')[1];
    return value === 'opt-in';
  }
  return false;
}

/**
 * Cria o stub fbq na window e injeta o script fbevents.js.
 * Chamado apenas uma vez (guarda interna) no bootstrap da aplicação.
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;
  loadPixelScript(getPixelId());
}

/**
 * Adiciona o <noscript> tracker do Meta no <head> do document.
 * Executa uma única vez.
 */
export function addMetaPixelNoscript(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector('img[data-meta-pixel-noscript]')) return;

  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${encodeURIComponent(getPixelId())}&ev=PageView&noscript=1`;
  img.setAttribute('data-meta-pixel-noscript', 'true');
  document.head.appendChild(img);
}

/**
 * Cria o <script> stub fbq e injeta o fbevents.js + <noscript> no document.head.
 * Idempotente: usa a flag `initialized` para não executar duas vezes.
 */
export function setupMetaPixel(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!isEnabled()) return;
  // O script é inicializado uma única vez independentemente de consentimento;
  // o gate de consentimento aplica-se apenas ao disparo de eventos (LGPD).
  initMetaPixel();
  addMetaPixelNoscript();
}

/**
 * Preserva os parâmetros de rastreio (UTM, fbclid, src, sck) da URL atual
 * ao construir a URL de redirecionamento para a Kiwify.
 * Evita duplicar parâmetros ou produzir duas interrogações.
 */
export function buildKiwifyUrl(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  const PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'src',
    'sck',
  ];

  const currentUrl = new URL(window.location.href);
  const target = new URL(baseUrl);

  // Mantém os parâmetros já presentes na URL base da Kiwify
  const merged = new URLSearchParams(target.searchParams);

  for (const key of PARAMS) {
    const value = currentUrl.searchParams.get(key);
    if (value) merged.set(key, value);
  }

  const mergedStr = merged.toString();
  if (!mergedStr) return target.toString();

  // Remove a query string original da base e adiciona a query mesclada
  const basePath = target.origin + target.pathname;
  return basePath + '?' + mergedStr;
}

/**
 * Grava o consentimento do usuário para eventos de marketing (LGPD).
 * - 'opt-in' → habilita o pixel; 'opt-out' → desabilita.
 * O cookie é lido em hasConsent() antes de disparar qualquer evento.
 */
export function setMetaConsent(consent: 'opt-in' | 'opt-out'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `lvd_meta_consent=${consent};path=/;max-age=31536000;samesite=lax;secure`;
}

/** Lê a escolha gravada no cookie lvd_meta_consent (null se ainda não respondeu). */
export function getMetaConsent(): 'opt-in' | 'opt-out' | null {
  if (typeof document === 'undefined') return null;
  const v = document.cookie.split('; ').find((p) => p.startsWith(CONSENT_COOKIE_KEY + '='))?.split('=')[1];
  return v === 'opt-in' || v === 'opt-out' ? v : null;
}

const AD_PARAMS = ['fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const AD_PARAMS_KEY = 'lvd_ad_params';
const SIGNUP_PREFIX = 'https://operacaoestudei.lovable.app/auth';

/** Guarda no localStorage os parâmetros do anúncio que vieram na URL. */
export function storeAdParams(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const found: Record<string, string> = {};
  for (const k of AD_PARAMS) { const v = url.searchParams.get(k); if (v) found[k] = v; }
  if (!Object.keys(found).length) return;
  try {
    const prev = JSON.parse(localStorage.getItem(AD_PARAMS_KEY) || '{}');
    localStorage.setItem(AD_PARAMS_KEY, JSON.stringify({ ...prev, ...found }));
  } catch { /* storage indisponível */ }
}

const CONSENT_PARAM = 'consent';

/**
 * Acrescenta os parâmetros guardados a uma URL, mantendo os existentes (ex.: mode=signup).
 * Com consentimento aceito (lvd_meta_consent=opt-in) também repassa consent=opt-in;
 * se o visitante recusou ou ainda não escolheu, o parâmetro é removido.
 */
export function withAdParams(href: string): string {
  if (typeof window === 'undefined') return href;
  let saved: Record<string, string> = {};
  try { saved = JSON.parse(localStorage.getItem(AD_PARAMS_KEY) || '{}'); } catch { saved = {}; }
  const u = new URL(href);
  for (const k of AD_PARAMS) if (saved[k]) u.searchParams.set(k, saved[k]);
  if (getMetaConsent() === 'opt-in') u.searchParams.set(CONSENT_PARAM, 'opt-in');
  else u.searchParams.delete(CONSENT_PARAM);
  return u.toString();
}

/** Atualiza todos os links de cadastro do Study Planner Pro com os parâmetros guardados. */
export function decorateSignupLinks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLAnchorElement>(`a[href^="${SIGNUP_PREFIX}"]`).forEach((a) => {
    a.href = withAdParams(a.href);
  });
}
