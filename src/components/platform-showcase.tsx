import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ImageIcon, Expand } from 'lucide-react';
import { Checkout } from '@/components/sales-checkout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ShowcaseVideo } from '@/components/showcase-video';
import { showcaseFeatures, showcaseMediaFor } from '@/lib/showcase-media';

const devices = [
  { id: 'desktop', label: 'Computador', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Celular', icon: Smartphone },
] as const;

const deviceMaxWidth = { desktop: Infinity, tablet: 600, mobile: 320 } as const;

export function PlatformShowcase() {
  const [selected, setSelected] = useState(1);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [device, setDevice] = useState<typeof devices[number]['id']>('desktop');
  const feature = showcaseFeatures[selected];
  if (!feature) return null;
  const deviceLabel = devices.find(item => item.id === device)?.label;
  const media = showcaseMediaFor(feature.title);
  const current = media[mediaIndex] ?? media[0];
  const maxW = Math.min(deviceMaxWidth[device], current?.maxW ?? Infinity);
  const boxRatio = current ? current.ratio * current.stretch : 1;

  return <section id="plataforma" aria-labelledby="platform-title" className="py-10 sm:py-14">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto mb-6 max-w-3xl text-center">
        <h2 id="platform-title" className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">CONHEÇA A PLATAFORMA <span className="text-gradient-gold">POR DENTRO</span></h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border bg-gradient-dark px-4 py-4 sm:px-6">
        <div className="min-w-0"><p className="font-semibold">{feature.title}</p><p className="mt-1 text-[10px] font-bold uppercase text-gold">{deviceLabel}</p></div>
        <div className="flex shrink-0 gap-2" role="group" aria-label="Formato da demonstração">
          {devices.map(({ id, label, icon: Icon }) => <Button key={id} size="icon" variant="outline" aria-label={label} title={label} aria-pressed={device === id} onClick={() => setDevice(id)} className={device === id ? 'border-gold bg-gradient-gold text-primary-foreground hover:text-primary-foreground' : 'border-border bg-card text-muted-foreground'}><Icon /></Button>)}
        </div>
      </div>
      <div className="grid gap-5 pt-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav aria-label="Funcionalidades da plataforma" className="min-w-0">
          <p className="mb-3 text-[10px] font-bold uppercase text-gold">Recursos incluídos</p>
          <div className="flex max-h-[520px] gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2">
            {showcaseFeatures.map(({ title, icon: Icon }, index) => <Button key={title} variant="outline" aria-pressed={selected === index} onClick={() => { setSelected(index); setMediaIndex(0); }} className={`h-auto min-h-20 w-56 shrink-0 justify-start whitespace-normal p-4 text-left lg:w-full ${selected === index ? 'border-gold/60 bg-gold/10 text-foreground hover:bg-gold/15' : 'border-border bg-card text-muted-foreground hover:border-gold/30'}`}><span className="grid size-9 shrink-0 place-items-center rounded-md border border-gold/30 bg-gold/5 text-gold"><Icon /></span><span className="min-w-0 text-sm font-semibold leading-snug">{title}</span></Button>)}
          </div>
        </nav>
        <div className="min-w-0" role="region" aria-label="Demonstração da funcionalidade" aria-live="polite">
          {current ? <>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {media.length > 1 && media.map(({ label }, index) => <Button key={label} variant="outline" onClick={() => setMediaIndex(index)} aria-pressed={mediaIndex === index} className={`h-auto whitespace-normal py-2 text-xs ${mediaIndex === index ? 'border-gold/60 bg-gold/10 text-gold' : 'border-border text-muted-foreground'}`}>{label}</Button>)}
              {current.kind === 'image' && <Dialog><DialogTrigger asChild><Button variant="outline" size="icon" aria-label="Ampliar imagem" title="Ampliar imagem" className="ml-auto shrink-0 border-border text-gold"><Expand /></Button></DialogTrigger><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto"><DialogTitle>{current.label}</DialogTitle><DialogDescription>{feature.title}</DialogDescription><img src={current.asset.url} alt={current.label} className="h-auto w-full" /></DialogContent></Dialog>}
            </div>
            <div key={`${mediaIndex}-${device}`} className="mx-auto w-full overflow-hidden rounded-lg border border-border bg-gradient-dark" style={{ aspectRatio: `${boxRatio}`, maxWidth: Number.isFinite(maxW) ? `${maxW}px` : undefined }}>
              {current.kind === 'video'
                ? <ShowcaseVideo label={current.label} src={current.asset.url} poster={current.poster?.url} captions={current.captions?.url} />
                : <img src={current.asset.url} alt={current.label} className="h-full w-full object-fill" />}
            </div>
          </> : <div className="flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-dark p-5 sm:aspect-video sm:p-8">
            <div className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-border bg-card text-muted-foreground shadow-elegant ${device === 'mobile' ? 'aspect-[9/16] h-full max-w-full' : device === 'tablet' ? 'aspect-[4/3] h-full max-w-full' : 'aspect-video w-full max-w-xl'}`}>
              <ImageIcon className="size-8 text-gold/50 sm:size-10" aria-hidden="true" />
              <span className="px-3 text-center text-xs sm:text-sm">Imagem em breve</span>
            </div>
          </div>}
          <div className="mt-4 text-center"><Checkout>Quero acessar o curso</Checkout></div>
          <div className="mx-auto mt-4 max-w-2xl text-center"><h3 className="text-xl font-bold sm:text-2xl">{feature.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p></div>
        </div>
      </div>
    </div>
  </section>;
}
