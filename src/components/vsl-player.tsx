import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Loader2, Maximize, Minimize, Play, VolumeX } from 'lucide-react';
// ============================================================================
// CONFIGURAÇÃO DO VÍDEO
// Vídeo da VSL hospedado no Vimeo. Os controles nativos do player ficam
// ofuscados (sem título, duração, botões e barra do Vimeo) e no lugar deles
// fica apenas a barra de progresso própria — o controle de avançar o vídeo.
// ============================================================================
const VIMEO_ID = '1243059209';
const VIMEO_ORIGIN = 'https://player.vimeo.com';
const POSTER_SRC = '/uploads/vsl-capa.jpg';
const VIMEO_SRC =
  `${VIMEO_ORIGIN}/video/${VIMEO_ID}` +
  '?api=1&autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&pip=0&keyboard=0&dnt=1&playsinline=1&autopause=0&color=c8a24a';

/** Momento do vídeo que dispara a rolagem suave até a oferta: 18 minutos e 53 segundos. */
const TRIGGER_SECONDS = 18 * 60 + 53;

/** O avanço do vídeo só fica liberado depois de 90 segundos assistidos. */
const SEEK_UNLOCK_SECONDS = 90;

type VimeoMessage = {
  event?: string;
  data?: { seconds?: number; duration?: number };
};

type VslPlayerProps = {
  /** Chamado uma única vez quando o vídeo chega em 26:53. */
  onOfferReached?: () => void;
};

/**
 * Player da VSL: vídeo 16:9 hospedado no Vimeo com os controles nativos
 * ofuscados (sem título, duração, menu ou botões do Vimeo). Do player original
 * fica apenas a barra de avanço, sempre visível; som começa mudo com o overlay
 * "Clique para Ouvir".
 */
export function VslPlayer({ onOfferReached }: VslPlayerProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const draggingRef = useRef(false);
  const apiReadyRef = useRef(false);
  const pausedRef = useRef(false);

  const [apiReady, setApiReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [seekUnlocked, setSeekUnlocked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [started, setStarted] = useState(false);

  // Se o autoplay for bloqueado, não deixa o indicador de carregamento girando para sempre.
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  const fireOffer = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    onOfferReached?.();
  }, [onOfferReached]);

  // Gatilho de rolagem: em 26:53. Se o vídeo for mais curto que isso, dispara
  // perto do final para a página não ficar travada.
  const maybeTrigger = useCallback(
    (seconds: number) => {
      const triggerAt =
        duration > 0 && duration < TRIGGER_SECONDS ? duration * 0.9 : TRIGGER_SECONDS;
      if (seconds >= triggerAt) fireOffer();
    },
    [duration, fireOffer],
  );

  /** Envia um comando para a API postMessage do player do Vimeo. */
  const post = useCallback((method: string, value?: unknown) => {
    const target = frameRef.current?.contentWindow;
    if (!target) return;
    target.postMessage(
      JSON.stringify(value === undefined ? { method } : { method, value }),
      VIMEO_ORIGIN,
    );
  }, []);

  /** Pede ao Vimeo os eventos que alimentam a barra de avanço e o estado de play/pause. */
  const subscribe = useCallback(() => {
    ['play', 'pause', 'ended', 'finish', 'timeupdate', 'playProgress', 'bufferstart', 'bufferend'].forEach((name) =>
      post('addEventListener', name),
    );
  }, [post]);

  // O iframe vem no HTML e pode avisar "ready" antes de este componente começar a escutar.
  // Por isso a inscrição é repetida até o player responder com algum evento.
  useEffect(() => {
    let tries = 0;
    const timer = window.setInterval(() => {
      if (apiReadyRef.current || ++tries > 40) {
        window.clearInterval(timer);
        return;
      }
      subscribe();
    }, 500);
    subscribe();
    return () => window.clearInterval(timer);
  }, [subscribe]);

  // Escuta os eventos do player do Vimeo: tempo, duração, play/pause e buffer.
  // É isso que alimenta a barra de avanço própria (o Vimeo não mostra nada).
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;
      if (event.source !== frameRef.current?.contentWindow) return;

      let payload: VimeoMessage;
      try {
        payload = (typeof event.data === 'string' ? JSON.parse(event.data) : event.data) as VimeoMessage;
      } catch {
        return;
      }
      if (!payload || typeof payload.event !== 'string') return;

      const total = payload.data?.duration;
      const seconds = payload.data?.seconds;
      if (typeof total === 'number' && total > 0) setDuration(total);

      if (payload.event !== 'ready') {
        apiReadyRef.current = true;
        setApiReady(true);
      }

      switch (payload.event) {
        case 'ready':
          subscribe();
          post('setVolume', 1);
          break;
        case 'play':
          pausedRef.current = false;
          setPlaying(true);
          break;
        case 'pause':
          pausedRef.current = true;
          setPlaying(false);
          break;
        case 'bufferstart':
          setLoading(true);
          break;
        case 'bufferend':
          setLoading(false);
          break;
        // Com api=1 o Vimeo manda o tempo como "playProgress"; "timeupdate" é o nome do SDK.
        case 'playProgress':
        case 'timeupdate':
          if (typeof seconds === 'number') {
            if (seconds > 0) {
              setStarted(true);
              setLoading(false);
              // Cobre o caso em que o evento "play" veio antes da inscrição.
              if (!pausedRef.current) setPlaying(true);
            }
            setCurrent(seconds);
            if (seconds >= SEEK_UNLOCK_SECONDS) setSeekUnlocked(true);
            maybeTrigger(seconds);
          }
          break;
        case 'finish':
        case 'ended':
          setPlaying(false);
          fireOffer();
          break;
        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fireOffer, maybeTrigger, post, subscribe]);

  const togglePlay = useCallback(() => {
    if (playing) post('pause');
    else post('play');
  }, [playing, post]);

  /** Clique no overlay: ativa o áudio, retoma o vídeo e remove a sobreposição. */
  const activateAudio = useCallback(() => {
    setUnlocked(true);
    post('setVolume', 1);
    post('play');
    // Garantia: se o player não avisar o início da reprodução, a capa sai mesmo assim.
    window.setTimeout(() => setStarted(true), 2500);
  }, [post]);

  /** Tela cheia no container (mantém a barra de avanço); no iPhone, que não aceita isso, pede ao player do Vimeo. */
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (container.requestFullscreen) {
      container.requestFullscreen().catch(() => post('requestFullscreen'));
    } else {
      post('requestFullscreen');
    }
  }, [post]);

  const seekToRatio = (ratio: number) => {
    if (!duration || !seekUnlocked) return;
    const clamped = Math.min(1, Math.max(0, ratio));
    setCurrent(clamped * duration);
    post('setCurrentTime', clamped * duration);
  };

  const seekFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    seekToRatio((event.clientX - rect.left) / rect.width);
  };

  const handleSeekDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    seekFromPointer(event);
  };

  const handleSeekMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) seekFromPointer(event);
  };

  const handleSeekUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleSeekKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!duration) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      seekToRatio((current + 5) / duration);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      seekToRatio((current - 5) / duration);
    } else if (event.key === 'Home') {
      event.preventDefault();
      seekToRatio(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      seekToRatio(1);
    }
  };

  const percent = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;

  return (
    <div
      ref={containerRef}
      className={`vsl-glow group relative w-full overflow-hidden border border-gold/25 bg-black ${
        fullscreen ? 'flex items-center justify-center rounded-none' : 'rounded-xl sm:rounded-2xl'
      }`}
    >
      <div className={`relative w-full ${fullscreen ? 'aspect-video max-h-full' : 'aspect-video'}`}>
        <iframe
          ref={frameRef}
          src={VIMEO_SRC}
          title="Aula gratuita do Método Aprovação Policial"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />

        {/* Capa local: aparece na hora enquanto o player do Vimeo baixa e inicia o vídeo. */}
        {!started && (
          <img
            src={POSTER_SRC}
            alt=""
            width={960}
            height={540}
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-cover"
          />
        )}

        {/* Camada transparente sobre o vídeo: o toque/clique alterna play e pause
            sem expor nenhum controle nativo (que estão desativados no embed). */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="absolute inset-0 z-10 cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gold"
        />

        {/* Indicador discreto de play quando o vídeo está pausado */}
        {unlocked && apiReady && !playing && !loading && (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full border border-gold/60 bg-black/45 shadow-gold sm:size-20">
              <Play className="size-6 translate-x-0.5 fill-current text-gold sm:size-8" />
            </span>
          </div>
        )}

      {/* Carregando */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-black/40">
          <Loader2 className="size-10 animate-spin text-gold" />
        </div>
      )}

      {/* Overlay translúcido: ativa o áudio e desaparece para sempre */}
      {!unlocked && (
        <button
          type="button"
          onClick={activateAudio}
          aria-label="Clique para ouvir o vídeo com áudio"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/45 backdrop-blur-[1px] transition-colors hover:bg-black/35"
        >
          <span className="relative grid size-16 place-items-center sm:size-24">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.2s]"
            />
            <span className="relative grid size-14 place-items-center rounded-full border border-gold/60 bg-gold/20 shadow-gold sm:size-20">
              <VolumeX className="size-7 animate-pulse text-gold sm:size-9" />
            </span>
          </span>
          <span className="px-4 font-display text-base font-bold uppercase tracking-[0.06em] text-foreground drop-shadow sm:text-2xl">
            Clique para Ouvir
          </span>
          <span className="px-4 text-[10px] uppercase tracking-widest text-foreground/70 sm:text-xs">
            Ligue o som da aula
          </span>
        </button>
      )}

        {/* Controle visível único: a barra de avançar o vídeo. Nada de duração,
            menu, botões ou marcações do player original. */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-2 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 pb-2 pt-6 sm:gap-3 sm:px-4 sm:pb-3">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Avançar o vídeo"
            aria-disabled={!seekUnlocked}
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-valuenow={Math.round(current)}
            aria-valuetext={duration ? `${Math.round(percent)}% do vídeo` : 'Vídeo'}
            onPointerDown={handleSeekDown}
            onPointerMove={handleSeekMove}
            onPointerUp={handleSeekUp}
            onPointerCancel={handleSeekUp}
            onKeyDown={handleSeekKey}
            className="group/seek relative -mx-1 flex h-9 min-w-0 flex-1 cursor-pointer touch-none items-center px-1 outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:h-6"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/25 transition-all group-hover/seek:h-2 sm:h-1.5">
              <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${percent}%` }} />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute size-3.5 -translate-x-1/2 rounded-full bg-gold opacity-70 shadow-gold transition-opacity group-hover/seek:opacity-100"
              style={{ left: `${percent}%` }}
            />
          </div>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Sair da tela cheia' : 'Assistir em tela cheia'}
            title={fullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            className="grid size-9 shrink-0 place-items-center rounded-md border border-gold/40 bg-black/55 text-gold outline-none transition hover:border-gold hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-gold sm:size-8"
          >
            {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
