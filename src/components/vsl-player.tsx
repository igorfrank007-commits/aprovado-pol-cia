import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Loader2, Play, VolumeX } from 'lucide-react';
// ============================================================================
// CONFIGURAÇÃO DO VÍDEO
// Vídeo da VSL hospedado no Vimeo. Os controles nativos do player ficam
// ofuscados (sem título, duração, botões e barra do Vimeo) e no lugar deles
// fica apenas a barra de progresso própria — o controle de avançar o vídeo.
// ============================================================================
const VIMEO_ID = '1238923676';
const VIMEO_ORIGIN = 'https://player.vimeo.com';
const VIMEO_SRC =
  `${VIMEO_ORIGIN}/video/${VIMEO_ID}` +
  '?autoplay=1&muted=1&controls=0&title=0&byline=0&portrait=0&pip=0&keyboard=0&dnt=1&playsinline=1&autopause=0&color=c8a24a';

/** Momento do vídeo que dispara a rolagem suave até a oferta: 26 minutos e 53 segundos. */
const TRIGGER_SECONDS = 26 * 60 + 53;

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
  const firedRef = useRef(false);
  const draggingRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

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

      switch (payload.event) {
        case 'ready':
          ['play', 'pause', 'ended', 'timeupdate', 'bufferstart', 'bufferend'].forEach((name) =>
            post('addEventListener', name),
          );
          post('setVolume', 1);
          setLoading(false);
          break;
        case 'play':
          setPlaying(true);
          setLoading(false);
          break;
        case 'pause':
          setPlaying(false);
          break;
        case 'bufferstart':
          setLoading(true);
          break;
        case 'bufferend':
          setLoading(false);
          break;
        case 'timeupdate':
          if (typeof seconds === 'number') {
            setCurrent(seconds);
            maybeTrigger(seconds);
          }
          break;
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
  }, [fireOffer, maybeTrigger, post]);

  const togglePlay = useCallback(() => {
    if (playing) post('pause');
    else post('play');
  }, [playing, post]);

  /** Clique no overlay: ativa o áudio, retoma o vídeo e remove a sobreposição. */
  const activateAudio = useCallback(() => {
    setUnlocked(true);
    post('setVolume', 1);
    post('play');
  }, [post]);

  const seekToRatio = (ratio: number) => {
    if (!duration) return;
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
    <div className="vsl-glow group relative w-full overflow-hidden rounded-xl border border-gold/25 bg-black sm:rounded-2xl">
      <div className="relative aspect-video w-full">
        <iframe
          ref={frameRef}
          src={VIMEO_SRC}
          title="Aula gratuita do Método Aprovação Policial"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoading(false)}
          className="absolute inset-0 h-full w-full border-0"
        />

        {/* Camada transparente sobre o vídeo: o toque/clique alterna play e pause
            sem expor nenhum controle nativo (que estão desativados no embed). */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="absolute inset-0 z-10 cursor-pointer bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-gold"
        />

        {/* Indicador discreto de play quando o vídeo está pausado */}
        {unlocked && !playing && !loading && (
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
        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 pb-2 pt-6 sm:px-4 sm:pb-3">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Avançar o vídeo"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-valuenow={Math.round(current)}
            aria-valuetext={duration ? `${Math.round(percent)}% do vídeo` : 'Vídeo'}
            onPointerDown={handleSeekDown}
            onPointerMove={handleSeekMove}
            onPointerUp={handleSeekUp}
            onPointerCancel={handleSeekUp}
            onKeyDown={handleSeekKey}
            className="group/seek relative -mx-1 flex h-9 cursor-pointer touch-none items-center px-1 outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:h-6"
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
        </div>
      </div>
    </div>
  );
}
