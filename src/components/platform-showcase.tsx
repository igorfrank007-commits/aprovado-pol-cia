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
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-plan p-px shadow-gold sm:rounded-3xl"><div className="relative overflow-hidden rounded-[calc(var(--radius-2xl)-1px)] bg-gradient-plan-soft px-3 py-9 sm:rounded-[calc(var(--radius-3xl)-1px)] sm:px-6 sm:py-12"><div aria-hidden className="grid-bg absolute inset-0 opacity-25" /><div aria-hidden className="absolute -top-28 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" /><div className="relative">
      <div className="mx-auto mb-5 max-w-3xl px-1 text-center sm:mb-6">
        <h2 id="platform-title" className="text-[1.6rem] font-bold uppercase leading-tight sm:text-4xl md:text-5xl">CONHEÇA UM POUCO <span className="text-gradient-gold">DO CURSO</span></h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border bg-gradient-dark px-3 py-3 sm:px-6 sm:py-4">
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-snug sm:text-base">{feature.title}</p><p className="mt-0.5 text-[10px] font-bold uppercase text-gold">{deviceLabel}</p></div>
        <div className="flex shrink-0 gap-1.5 sm:gap-2" role="group" aria-label="Formato da demonstração">
          {devices.map(({ id, label, icon: Icon }) => <Button key={id} size="icon" variant="outline" aria-label={label} title={label} aria-pressed={device === id} onClick={() => setDevice(id)} className={`size-9 sm:size-10 ${device === id ? 'border-gold bg-gradient-gold text-primary-foreground hover:text-primary-foreground' : 'border-border bg-card text-muted-foreground'}`}><Icon /></Button>)}
        </div>
      </div>
      <div className="grid gap-5 pt-4 sm:pt-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav aria-label="Funcionalidades da plataforma" className="min-w-0">
          <p className="mb-2 text-[10px] font-bold uppercase text-gold sm:mb-3">Recursos incluídos</p>
          <div className="snap-x-mandatory flex max-h-[520px] gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2">
            {showcaseFeatures.map(({ title, icon: Icon }, index) => <Button key={title} variant="outline" aria-pressed={selected === index} onClick={() => { setSelected(index); setMediaIndex(0); }} className={`snap-start-item h-auto min-h-16 w-[13rem] shrink-0 justify-start gap-2.5 whitespace-normal p-3 text-left sm:min-h-20 sm:w-56 sm:p-4 lg:w-full ${selected === index ? 'border-gold/60 bg-gold/10 text-foreground hover:bg-gold/15' : 'border-border bg-card text-muted-foreground hover:border-gold/30'}`}><span className="grid size-8 shrink-0 place-items-center rounded-md border border-gold/30 bg-gold/5 text-gold sm:size-9"><Icon /></span><span className="min-w-0 text-[13px] font-semibold leading-snug sm:text-sm">{title}</span></Button>)}
          </div>
        </nav>
        <div className="min-w-0" role="region" aria-label="Demonstração da funcionalidade" aria-live="polite">
          {current ? <>
            <div className="mb-2.5 flex flex-wrap items-center gap-2 sm:mb-3">
              {media.length > 1 && media.map(({ label }, index) => <Button key={label} variant="outline" onClick={() => setMediaIndex(index)} aria-pressed={mediaIndex === index} className={`h-auto whitespace-normal px-2.5 py-1.5 text-[11px] sm:py-2 sm:text-xs ${mediaIndex === index ? 'border-gold/60 bg-gold/10 text-gold' : 'border-border text-muted-foreground'}`}>{label}</Button>)}
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
          <div className="mt-3 flex justify-center sm:mt-4"><Checkout>Quero acessar o curso</Checkout></div>
          <div className="mx-auto mt-4 max-w-2xl px-1 text-center"><h3 className="text-lg font-bold leading-snug sm:text-2xl">{feature.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3">{feature.desc}</p></div>
        </div>
      </div>
      </div></div></div>
    </div>
  </section>;
}
