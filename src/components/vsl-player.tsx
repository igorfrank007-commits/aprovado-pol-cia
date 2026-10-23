import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Loader2, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
// Vídeo hospedado no Google Drive (fonte do player).
const DRIVE_FILE_ID = '1eh2mZ4e1c2hMiPJZpCB_O8pi9EChfnTS';
const DRIVE_STREAM_URL = `https://drive.usercontent.google.com/download?id=${DRIVE_FILE_ID}&export=download&confirm=t`;
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview?autoplay=1`;

// Vídeo hospedado no Google Drive.
const DRIVE_FILE_ID = '1eh2mZ4e1c2hMiPJZpCB_O8pi9EChfnTS';
const DRIVE_STREAM_URL = `https://drive.usercontent.google.com/download?id=${DRIVE_FILE_ID}&export=download&confirm=t`;
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview?autoplay=1`;
const DRIVE_FILE_ID = '1eh2mZ4e1c2hMiPJZpCB_O8pi9EChfnTS';
const DRIVE_STREAM_URL = `https://drive.usercontent.google.com/download?id=${DRIVE_FILE_ID}&export=download&confirm=t`;
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview?autoplay=1`;
// ============================================================================
// CONFIGURAÇÃO DO VÍDEO
// Vídeo hospedado no Google Drive. O player tenta primeiro o stream direto,
// que permite controles próprios e leitura do tempo (necessária para o gatilho
// de 26:53); se o Drive bloquear, cai automaticamente para o embed oficial.
// ============================================================================
const DRIVE_FILE_ID = '1eh2mZ4e1c2hMiPJZpCB_O8pi9EChfnTS';
const DRIVE_STREAM_URL = `https://drive.usercontent.google.com/download?id=${DRIVE_FILE_ID}&export=download&confirm=t`;
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview?autoplay=1`;

/** Momento do vídeo que dispara a rolagem suave até a oferta: 26 minutos e 53 segundos. */
const TRIGGER_SECONDS = 26 * 60 + 53;

type VslPlayerProps = {
  /** Chamado uma única vez quando o vídeo chega em 26:53. */
  onOfferReached?: () => void;
};

/**
 * Player da VSL: vídeo 16:9 do Google Drive, autoplay mudo com overlay
 * "Clique para Ouvir", play/pause, mute, barra de progresso arrastável (com
 * scrubbing livre e sem exibir a duração) e tela cheia.
 */
export function VslPlayer({ onOfferReached }: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const draggingRef = useRef(false);

  const [mode, setMode] = useState<'video' | 'embed'>('video');
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [audioOn, setAudioOn] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const fireOffer = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    onOfferReached?.();
  }, [onOfferReached]);

  // Gatilho de rolagem: em 26:53. Se o vídeo for mais curto que isso, dispara
  // perto do final para a página não ficar travada.
  const maybeTrigger = useCallback(
    (video: HTMLVideoElement) => {
      const total = video.duration;
      const triggerAt =
        Number.isFinite(total) && total > 0 && total < TRIGGER_SECONDS ? total * 0.9 : TRIGGER_SECONDS;
      if (video.currentTime >= triggerAt) fireOffer();
    },
    [fireOffer],
  );

  // Autoplay sempre mudo (política dos navegadores) + overlay "Clique para Ouvir".
  useEffect(() => {
    if (mode !== 'video') return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 1;
    void video.play().catch(() => undefined);
  }, [mode]);

  // Atualiza a barra de progresso com fluidez enquanto o vídeo roda.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video) {
        setCurrent(video.currentTime);
        maybeTrigger(video);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [playing, maybeTrigger]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  /** Clique no overlay: ativa o áudio, retoma o vídeo e remove a sobreposição. */
  const activateAudio = useCallback(() => {
    const video = videoRef.current;
    setUnlocked(true);
    setAudioOn(true);
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    if (video.paused) void video.play().catch(() => undefined);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      if (video.volume === 0) video.volume = 1;
      setAudioOn(true);
      setUnlocked(true);
    } else {
      video.muted = true;
      setAudioOn(false);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }
    void wrapper.requestFullscreen?.().catch(() => undefined);
  }, []);

  const seekFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const time = ratio * duration;
    video.currentTime = time;
    setCurrent(time);
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
    const video = videoRef.current;
    if (!video) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      video.currentTime = Math.min(duration, video.currentTime + 5);
      setCurrent(video.currentTime);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 5);
      setCurrent(video.currentTime);
    } else if (event.key === 'Home') {
      event.preventDefault();
      video.currentTime = 0;
      setCurrent(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      video.currentTime = duration;
      setCurrent(duration);
    }
  };

  const percent = duration > 0 ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;
  const showSoundOverlay = mode === 'video' && !unlocked;

  return (
    <div
      ref={wrapperRef}
      className="vsl-glow group relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/25 bg-black"
    >
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        preload="auto"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => {
          setPlaying(true);
          setLoading(false);
        }}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => {
          setCurrent(event.currentTarget.currentTime);
          maybeTrigger(event.currentTarget);
        }}
        onError={() => {
          setLoading(false);
          setMode('embed');
        }}
        onEnded={() => {
          setPlaying(false);
          fireOffer();
        }}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        aria-label="Aula gratuita do Método Aprovação Policial"
      >
        <source src={DRIVE_STREAM_URL} type="video/mp4" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>

      {/* Carregando */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <Loader2 className="size-10 animate-spin text-gold" />
        </div>
      )}

      {/* Overlay translúcido: ativa o áudio e desaparece para sempre */}
      {showSoundOverlay && (
        <button
          type="button"
          onClick={activateAudio}
          aria-label="Clique para ouvir o vídeo com áudio"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/45 backdrop-blur-[1px] transition-colors hover:bg-black/35"
        >
          <span className="relative grid size-20 place-items-center sm:size-24">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.2s]"
            />
            <span className="relative grid size-16 place-items-center rounded-full border border-gold/60 bg-gold/20 shadow-gold sm:size-20">
              <VolumeX className="size-8 animate-pulse text-gold sm:size-9" />
            </span>
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-foreground drop-shadow sm:text-2xl">
            Clique para Ouvir
          </span>
          <span className="text-[11px] uppercase tracking-widest text-foreground/70 sm:text-xs">
            Ligue o som da aula
          </span>
        </button>
      )}

      {/* Fallback: embed oficial do Drive, caso o stream direto seja bloqueado */}
      {mode === 'embed' && (
        <iframe
          src={DRIVE_EMBED_URL}
          title="Aula gratuita do Método Aprovação Policial"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 z-40 h-full w-full border-0"
        />
      )}

      {/* Controles customizados */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 pb-2.5 pt-10 sm:px-4 ${
          mode === 'video' ? '' : 'hidden'
        }`}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
          aria-valuenow={Math.round(current)}
          onPointerDown={handleSeekDown}
          onPointerMove={handleSeekMove}
          onPointerUp={handleSeekUp}
          onPointerCancel={handleSeekUp}
          onKeyDown={handleSeekKey}
          className="group/seek relative flex h-6 cursor-pointer touch-none items-center outline-none"
        >
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/25 transition-all group-hover/seek:h-2">
            <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${percent}%` }} />
          </div>
          <span
            aria-hidden
            className="absolute size-3.5 -translate-x-1/2 rounded-full bg-gold opacity-0 shadow-gold transition-opacity group-hover/seek:opacity-100"
            style={{ left: `${percent}%` }}
          />
        </div>

        <div className="mt-1 flex items-center gap-2 text-foreground sm:gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            className="grid size-9 place-items-center rounded-full bg-gold/15 text-gold transition hover:bg-gold/30"
          >
            {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={audioOn ? 'Silenciar vídeo' : 'Ativar som'}
            className="grid size-9 place-items-center rounded-full bg-foreground/10 text-foreground transition hover:bg-foreground/20"
          >
            {audioOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
          </button>

          <span className="flex-1" />

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Tela cheia"
            className="grid size-9 place-items-center rounded-full bg-foreground/10 text-foreground transition hover:bg-foreground/20"
          >
            <Maximize className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
