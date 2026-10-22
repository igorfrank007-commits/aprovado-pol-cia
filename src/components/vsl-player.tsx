import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Loader2, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import posterAsset from '@/assets/video-poster.webp.asset.json';
import mp4Asset from '@/assets/method-video.mp4.asset.json';
import webmAsset from '@/assets/method-video.webm.asset.json';

// ============================================================================
// CONFIGURAÇÃO DO VÍDEO
// O player usa sempre o arquivo local (src/assets), com todos os controles
// próprios: autoplay com som, play/pause, mute, barra de progresso e tela cheia.
// Para trocar a aula, basta substituir os arquivos referenciados abaixo.
// ============================================================================
const VIDEO_SOURCES = [
  { src: mp4Asset.url, type: 'video/mp4' },
  { src: webmAsset.url, type: 'video/webm' },
];

/** Momento do vídeo que dispara a rolagem para a oferta: 26 minutos e 53 segundos. */
const TRIGGER_SECONDS = 26 * 60 + 53;

/**
 * Se o navegador bloquear totalmente o autoplay (sem som nenhum), a página se
 * libera depois desse tempo para o visitante nunca ficar preso na tela do vídeo.
 */
const FALLBACK_SECONDS = 90;

type VslPlayerProps = {
  /** Chamado uma única vez quando o vídeo chega em 26:53 (ou quando não pode tocar). */
  onOfferReached?: () => void;
};

type Overlay = 'none' | 'sound' | 'start';

function formatTime(total: number) {
  if (!Number.isFinite(total) || total < 0) return '0:00';
  const seconds = Math.floor(total % 60);
  const minutes = Math.floor((total / 60) % 60);
  const hours = Math.floor(total / 3600);
  const pad = (value: number) => String(value).padStart(2, '0');
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

/**
 * Player da VSL: vídeo local em 16:9, autoplay (tentando com áudio), play/pause,
 * mute, barra de progresso arrastável, tempo e tela cheia.
 */
export function VslPlayer({ onOfferReached }: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const hideTimer = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState<Overlay>('none');
  const [controlsVisible, setControlsVisible] = useState(true);

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

  // Autoplay: tenta primeiro com som; se o navegador bloquear, tenta sem som e
  // oferece o botão "Ativar som"; se bloquear tudo, mostra o overlay de play.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const attempt = async () => {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        if (cancelled) return;
        setMuted(false);
        setOverlay('none');
      } catch {
        if (cancelled) return;
        try {
          video.muted = true;
          await video.play();
          if (cancelled) return;
          setMuted(true);
          setOverlay('sound');
        } catch {
          if (cancelled) return;
          setMuted(true);
          setOverlay('start');
        }
      }
    };

    void attempt();
    return () => {
      cancelled = true;
    };
  }, []);

  // Libera as seções abaixo caso o vídeo nunca consiga tocar.
  useEffect(() => {
    if (overlay !== 'start') return;
    const timer = window.setTimeout(fireOffer, FALLBACK_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [overlay, fireOffer]);

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

  const scheduleHide = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (!playing) return;
    hideTimer.current = window.setTimeout(() => setControlsVisible(false), 3200);
  }, [playing]);

  useEffect(() => {
    scheduleHide();
  }, [scheduleHide]);

  useEffect(
    () => () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    },
    [],
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setOverlay('start'));
    } else {
      video.pause();
    }
  }, []);

  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
    setOverlay('none');
    if (video.paused) void video.play().catch(() => setOverlay('start'));
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted && video.volume === 0) video.volume = 1;
    setMuted(nextMuted);
    setOverlay('none');
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
  const controlsActive = controlsVisible || !playing || overlay !== 'none';

  return (
    <div
      ref={wrapperRef}
      onMouseMove={scheduleHide}
      onTouchStart={scheduleHide}
      className="vsl-glow group relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/25 bg-black"
    >
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        poster={posterAsset.url}
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
        onError={fireOffer}
        onEnded={() => {
          setPlaying(false);
          fireOffer();
        }}
        className="absolute inset-0 h-full w-full bg-black object-contain"
        aria-label="Aula gratuita do Método Aprovação Policial"
      >
        {VIDEO_SOURCES.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        Seu navegador não suporta a reprodução de vídeo.
      </video>

      {/* Carregando */}
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <Loader2 className="size-10 animate-spin text-gold" />
        </div>
      )}

      {/* Aviso de som: o navegador liberou o autoplay apenas sem áudio */}
      {overlay === 'sound' && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gold/60 bg-black/85 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gold shadow-gold backdrop-blur sm:text-xs"
        >
          <VolumeX className="size-4 animate-pulse" />
          Ativar som
        </button>
      )}

      {/* Autoplay totalmente bloqueado: porta de entrada clássica */}
      {overlay === 'start' && (
        <button
          type="button"
          onClick={enableSound}
          aria-label="Reproduzir o vídeo com áudio"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/55 backdrop-blur-[2px] transition-colors hover:bg-black/45"
        >
          <span className="relative grid size-20 place-items-center sm:size-24">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.4s]"
            />
            <span className="relative grid size-16 place-items-center rounded-full border border-gold/60 bg-gold/20 shadow-gold sm:size-20">
              <Play className="size-8 fill-current text-gold sm:size-9" />
            </span>
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-foreground drop-shadow sm:text-2xl">
            Clique para Ouvir
          </span>
          <span className="text-xs uppercase tracking-widest text-foreground/70">Ative o som do vídeo</span>
        </button>
      )}

      {/* Controles customizados */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300 sm:px-4 ${
          controlsActive ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration) || 0}
          aria-valuenow={Math.round(current)}
          aria-valuetext={`${formatTime(current)} de ${formatTime(duration)}`}
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
            aria-label={muted ? 'Ativar som' : 'Silenciar vídeo'}
            className="grid size-9 place-items-center rounded-full bg-foreground/10 text-foreground transition hover:bg-foreground/20"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>

          <span className="font-mono text-[11px] tabular-nums text-foreground/80 sm:text-xs">
            {formatTime(current)} / {formatTime(duration)}
          </span>

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
