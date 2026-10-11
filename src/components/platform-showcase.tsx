import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ImageIcon, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { benefits } from '@/lib/sales-content';
import planningConfiguration from '@/assets/planejamento-configuracao.png.asset.json';
import planningSchedule from '@/assets/planejamento-cronograma.png.asset.json';

const planningImages = [
  { label: 'Configuração do planejamento', asset: planningConfiguration },
  { label: 'Cronograma gerado', asset: planningSchedule },
];

const devices = [
  { id: 'desktop', label: 'Computador', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Celular', icon: Smartphone },
] as const;

export function PlatformShowcase() {
  const [selected, setSelected] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [device, setDevice] = useState<typeof devices[number]['id']>('desktop');
  const feature = benefits[selected];
  if (!feature) return null;
  const deviceLabel = devices.find(item => item.id === device)?.label;
  const image = selected === 1 ? planningImages[imageIndex] : undefined;

  return <section id="plataforma" aria-labelledby="platform-title" className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase text-gold">Conheça a plataforma</span>
        <h2 id="platform-title" className="mt-4 text-3xl font-bold uppercase sm:text-4xl md:text-5xl">Seu método. <span className="text-gradient-gold">Sua preparação.</span></h2>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border bg-gradient-dark px-4 py-4 sm:px-6">
        <div className="min-w-0"><p className="font-semibold">{feature.title}</p><p className="mt-1 text-[10px] font-bold uppercase text-gold">{deviceLabel}</p></div>
        <div className="flex shrink-0 gap-2" role="group" aria-label="Formato da imagem">
          {devices.map(({ id, label, icon: Icon }) => <Button key={id} size="icon" variant="outline" aria-label={label} title={label} aria-pressed={device === id} onClick={() => setDevice(id)} className={device === id ? 'border-gold bg-gradient-gold text-primary-foreground hover:text-primary-foreground' : 'border-border bg-card text-muted-foreground'}><Icon /></Button>)}
        </div>
      </div>
      <div className="grid gap-5 pt-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav aria-label="Funcionalidades da plataforma" className="min-w-0">
          <p className="mb-3 text-[10px] font-bold uppercase text-gold">Recursos incluídos</p>
          <div className="flex max-h-[520px] gap-2 overflow-x-auto pb-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2">
            {benefits.map(({ title, icon: Icon }, index) => <Button key={title} variant="outline" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`h-auto min-h-20 w-56 shrink-0 justify-start whitespace-normal p-4 text-left lg:w-full ${selected === index ? 'border-gold/60 bg-gold/10 text-foreground hover:bg-gold/15' : 'border-border bg-card text-muted-foreground hover:border-gold/30'}`}><span className="grid size-9 shrink-0 place-items-center rounded-md border border-gold/30 bg-gold/5 text-gold"><Icon /></span><span className="min-w-0 text-sm font-semibold leading-snug">{title}</span></Button>)}
          </div>
        </nav>
        <div className="min-w-0" role="region" aria-label="Demonstração da funcionalidade" aria-live="polite">
          {image ? <>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {planningImages.map(({ label }, index) => <Button key={label} variant="outline" onClick={() => setImageIndex(index)} aria-pressed={imageIndex === index} className={`h-auto whitespace-normal py-2 text-xs ${imageIndex === index ? 'border-gold/60 bg-gold/10 text-gold' : 'border-border text-muted-foreground'}`}>{label}</Button>)}
              <Dialog><DialogTrigger asChild><Button variant="outline" size="icon" aria-label="Ampliar imagem" title="Ampliar imagem" className="ml-auto shrink-0 border-border text-gold"><Expand /></Button></DialogTrigger><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto"><DialogTitle>{image.label}</DialogTitle><DialogDescription> cronograma e planejamento automáticos</DialogDescription><img src={image.asset.url} alt={image.label} className="h-auto w-full" /></DialogContent></Dialog>
            </div>
            <div className="flex h-[360px] justify-center overflow-hidden rounded-lg border border-border bg-gradient-dark sm:h-[480px]">
              <div key={`${imageIndex}-${device}`} className={`h-full overflow-y-auto ${device === 'mobile' ? 'w-full max-w-[300px]' : device === 'tablet' ? 'w-full max-w-[560px]' : 'w-full'}`}>
                <img src={image.asset.url} alt={image.label} className="h-auto w-full" />
              </div>
            </div>
          </> : <div className="flex aspect-[3/2] items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-dark p-5 sm:aspect-video sm:p-8">
            <div className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-border bg-card text-muted-foreground shadow-elegant ${device === 'mobile' ? 'aspect-[9/16] h-full max-w-full' : device === 'tablet' ? 'aspect-[4/3] h-full max-w-full' : 'aspect-video w-full max-w-xl'}`}>
              <ImageIcon className="size-8 text-gold/50 sm:size-10" aria-hidden="true" />
              <span className="px-3 text-center text-xs sm:text-sm">Imagem em breve</span>
            </div>
          </div>}
          <div className="mx-auto mt-6 max-w-2xl text-center"><h3 className="text-xl font-bold sm:text-2xl">{feature.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p></div>
        </div>
      </div>
    </div>
  </section>;
}