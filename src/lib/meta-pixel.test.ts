import { describe, expect, test } from 'bun:test';

const SIGNUP = 'https://operacaoestudei.lovable.app/auth?mode=signup';

/** Simula browser: cookie de consentimento + parâmetros de anúncio guardados. */
function stubBrowser(consent: 'opt-in' | 'opt-out' | null, saved: Record<string, string> = {}) {
  const store: Record<string, string> = { lvd_ad_params: JSON.stringify(saved) };
  const cookie = consent ? `theme=dark; lvd_meta_consent=${consent}` : 'theme=dark';
  const storage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
  };
  (globalThis as Record<string, unknown>).window = { location: { href: 'https://comopassaremconcursos.lovable.app/' } };
  (globalThis as Record<string, unknown>).localStorage = storage;
  (globalThis as Record<string, unknown>).document = { cookie };
}

const { withAdParams } = await import('./meta-pixel');

describe('repasse de consentimento nos links de cadastro', () => {
  test('acrescenta consent=opt-in junto de fbclid e utm_* quando o visitante aceitou', () => {
    stubBrowser('opt-in', { fbclid: 'ABC123', utm_source: 'facebook', utm_campaign: 'lancamento' });
    const url = new URL(withAdParams(SIGNUP));
    expect(url.searchParams.get('mode')).toBe('signup');
    expect(url.searchParams.get('fbclid')).toBe('ABC123');
    expect(url.searchParams.get('utm_source')).toBe('facebook');
    expect(url.searchParams.get('utm_campaign')).toBe('lancamento');
    expect(url.searchParams.get('consent')).toBe('opt-in');
  });

  test('não acrescenta consentimento quando o visitante recusou', () => {
    stubBrowser('opt-out', { fbclid: 'ABC123' });
    const url = new URL(withAdParams(SIGNUP));
    expect(url.searchParams.get('consent')).toBeNull();
    expect(url.searchParams.get('fbclid')).toBe('ABC123');
    expect(url.searchParams.get('mode')).toBe('signup');
  });

  test('não acrescenta consentimento quando ainda não houve escolha', () => {
    stubBrowser(null, { utm_medium: 'pago' });
    const url = new URL(withAdParams(SIGNUP));
    expect(url.searchParams.get('consent')).toBeNull();
    expect(url.searchParams.get('utm_medium')).toBe('pago');
  });

  test('remove consent=opt-in de um link já decorado depois da recusa', () => {
    stubBrowser('opt-out');
    const decorated = 'https://operacaoestudei.lovable.app/auth?mode=signup&consent=opt-in';
    const url = new URL(withAdParams(decorated));
    expect(url.searchParams.get('consent')).toBeNull();
    expect(url.searchParams.get('mode')).toBe('signup');
  });
});
