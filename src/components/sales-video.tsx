import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import videoAsset from '@/assets/method-video.mp4.asset.json';
import posterAsset from '@/assets/video-poster.webp.asset.json';
export function SalesVideo() {
 const video = useRef<HTMLVideoElement>(null);
 const [playing, setPlaying] = useState(false);
 const [muted, setMuted] = useState(true);
 const [error, setError] = useState(false);
 async function toggle() {
  const player = video.current;
  if (!player) return;
  if (playing) { player.pause(); return; }
  player.muted = false; setMuted(false);
  try { await player.play(); setError(false); } catch { setError(true); }
 }
 function toggleSound() { const player = video.current; if (!player) return; player.muted = !muted; setMuted(!muted); }
 return <div className="group relative h-full w-full">
  <video ref={video} src={videoAsset.url} poster={posterAsset.url} muted={muted} loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onClick={toggle} className="h-full w-full cursor-pointer object-cover object-top" />
  {!playing && <div className="absolute inset-0 grid place-items-center bg-video-overlay"><Button onClick={toggle} aria-label="Reproduzir vídeo" title="Reproduzir vídeo" size="icon" className="h-20 w-20 rounded-full border-2 border-foreground/30 bg-gold/80 text-foreground shadow-gold hover:bg-gold"><Play className="size-10 fill-current" /></Button></div>}
  <div className="absolute inset-x-0 bottom-0 flex justify-between p-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
   <Button onClick={toggle} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'} title={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'} size="icon" className="video-control rounded-full">{playing ? <Pause /> : <Play />}</Button>
   <Button onClick={toggleSound} aria-label={muted ? 'Ativar som' : 'Desativar som'} title={muted ? 'Ativar som' : 'Desativar som'} size="icon" className="video-control rounded-full">{muted ? <VolumeX /> : <Volume2 />}</Button>
  </div>
  {error && <p role="alert" className="absolute inset-x-0 bottom-16 bg-background/90 p-3 text-center text-sm">Não foi possível reproduzir. Tente novamente.</p>}
 </div>;
}
