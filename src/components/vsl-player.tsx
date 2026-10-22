import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import videoMp4 from '@/assets/method-video.mp4.asset.json';
import videoWebm from '@/assets/method-video.webm.asset.json';
import posterAsset from '@/assets/video-poster.webp.asset.json';

// Tempo do vídeo (em segundos) que dispara o scroll suave até o botão de oferta.
// 37 minutos e 35 segundos = 2255 segundos. Ajuste aqui se necessário.
const SCROLL_AT_SECONDS = 37 * 60 + 35;

type VslPlayerProps = {
  /** Chamado quando o vídeo chega no tempo definido em SCROLL_AT_SECONDS. */
  onOfferReached?: () => void;
};

/**
 * Player de VSL: 16:9, autoplay mudo, sem controles nativos,
 * barra de progresso própria (com scrubbing e sem exibir duração)
 * e overlay "Clique para Ouvir".
 */
export function VslPlayer({ onOfferReached }: VslPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const draggingRef = useRef(false);

  const [muted, setMuted] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Pinta a barra de progresso direto no DOM (sem re-renderizar a cada timeupdate).
  const paintProgress = useCallback(() => {
    const video = videoRef.current;
    const fill = fillRef.current;
    if (!video || !fill) return;
    const duration = video.duration;
    const pct = Number.isFinite(duration) && duration > 0 ? (video.currentTime / duration) * 100 : 0;
    fill.style.width = `${pct}%`;
    barRef.current?.setAttribute('aria-valuenow', String(Math.round(pct)));
  }, []);

  // Autoplay mudo assim que a página carrega.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        /* bloqueado pelo navegador: o overlay permite iniciar manualmente */
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const activateAudio = useCallback(() => {
    const video = videoRef.current;
    setOverlayVisible(false);
    setMuted(false);
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next && video.paused) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined);
    }
  }, []);

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const bar = barRef.current;
      const video = videoRef.current;
      if (!bar || !video) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      video.currentTime = ratio * duration;
      paintProgress();
    },
    [paintProgress],
  );

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* captura de ponteiro indisponível */
    }
    seekFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    seekFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      /* já liberado */
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    const step = event.shiftKey ? 30 : 5;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      video.currentTime = Math.min(duration, video.currentTime + step);
      paintProgress();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - step);
      paintProgress();
    }
  };

  const handleTimeUpdate = () => {
    paintProgress();
    if (scrolledRef.current) return;
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    // Se o vídeo for mais curto que 37:35, o scroll acontece no finalzinho dele.
    const triggerAt = duration > SCROLL_AT_SECONDS ? SCROLL_AT_SECONDS : duration * 0.97;
    if (video.currentTime >= triggerAt) {
      scrolledRef.current = true;
      onOfferReached?.();
    }
  };

  return (
    <div className="vsl-glow group relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/25 bg-black">
      <video
        ref={videoRef}
        className="h-full w-full bg-black object-contain"
        poster={posterAsset.url}
        autoPlay
        muted
        playsInline
        preload="auto"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        aria-label="Vídeo de apresentação do método"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={paintProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={() => {
          if (!overlayVisible) togglePlay();
        }}
      >
        <source src={videoMp4.url} type="video/mp4" />
        <source src={videoWebm.url} type="video/webm" />
        Seu navegador não suporta a reprodução de vídeo.
      </video>

      {/* Controles discretos: apenas barra de progresso (sem tempo/duração). */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-2 pt-8 transition-opacity duration-300 ${
          overlayVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="mb-1 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            className="grid size-9 place-items-center rounded-full text-foreground/90 transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Ativar som' : 'Desativar som'}
            className="grid size-9 place-items-center rounded-full text-foreground/90 transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
        <div
          ref={barRef}
          role="slider"
          tabIndex={0}
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="relative -mx-1 cursor-pointer touch-none py-2 focus-visible:outline-none"
        >
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/25 transition-all group-hover:h-2">
            <div ref={fillRef} className="h-full w-0 rounded-full bg-gradient-gold" />
          </div>
        </div>
      </div>

      {/* Overlay "Clique para Ouvir" */}
      {overlayVisible && (
        <button
          type="button"
          onClick={activateAudio}
          aria-label="Clique para ouvir o vídeo com áudio"
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/55 backdrop-blur-[2px] transition-colors hover:bg-black/45"
        >
          <span className="relative grid size-20 place-items-center sm:size-24">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.4s]"
            />
            <span className="relative grid size-16 place-items-center rounded-full border border-gold/60 bg-gold/20 shadow-gold sm:size-20">
              <VolumeX className="size-8 animate-pulse text-gold sm:size-9" />
            </span>
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-foreground drop-shadow sm:text-2xl">
            Clique para Ouvir
          </span>
          <span className="text-xs uppercase tracking-widest text-foreground/70">Ative o som do vídeo</span>
        </button>
      )}
    </div>
  );
}
