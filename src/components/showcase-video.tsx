import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  label: string;
  src: string;
  poster?: string;
  captions?: string;
};

// Player da vitrine: controles nativos (reprodução, volume, barra de tempo, tela cheia
// e menu de legendas) com as legendas já ligadas e um botão dourado de reprodução.
export function ShowcaseVideo({ label, src, poster, captions }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    const player = video.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    try { await player.play(); } catch { /* o usuário pode reproduzir pelos controles nativos */ }
  }

  return <div className="relative h-full w-full bg-black">
    <video ref={video} controls playsInline preload="metadata" poster={poster}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      className="h-full w-full object-cover">
      <source src={src} type="video/mp4" />
      {captions && <track kind="captions" src={captions} srcLang="pt" label="Legendas (Português)" default />}
      Seu navegador não suporta a reprodução de vídeo.
    </video>
    {!playing && <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <Button onClick={toggle} aria-label={`Reproduzir ${label}`} title={`Reproduzir ${label}`} size="icon"
        className="pointer-events-auto size-16 rounded-full border-2 border-foreground/30 bg-gold/80 text-foreground shadow-gold hover:bg-gold sm:size-20">
        <Play className="size-8 fill-current" />
      </Button>
    </div>}
  </div>;
}
