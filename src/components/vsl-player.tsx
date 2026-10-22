import { useState } from 'react';
import { VolumeX } from 'lucide-react';
import posterAsset from '@/assets/video-poster.webp.asset.json';

// Vídeo hospedado no Google Drive. Para trocar a aula, basta alterar o ID abaixo
// (o arquivo precisa estar compartilhado como "Qualquer pessoa com o link").
const DRIVE_FILE_ID = '1eh2mZ4e1c2hMiPJZpCB_O8pi9EChfnTS';
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;

type VslPlayerProps = {
  /**
   * Mantido por compatibilidade com a página de vendas. O embed do Google Drive
   * não expõe o tempo de reprodução, então o callback não é disparado.
   */
  onOfferReached?: () => void;
};

/**
 * Player de VSL: 16:9 com o vídeo do Google Drive embutido.
 * O overlay "Clique para Ouvir" funciona como porta de entrada — o navegador só
 * libera áudio depois de uma interação do usuário.
 */
export function VslPlayer(_props: VslPlayerProps) {
  const [started, setStarted] = useState(false);

  return (
    <div className="vsl-glow group relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/25 bg-black">
      {started ? (
        <iframe
          src={DRIVE_EMBED_URL}
          title="Vídeo de apresentação do método"
          className="absolute inset-0 h-full w-full bg-black"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <img
          src={posterAsset.url}
          alt="Aula gratuita do Método Aprovação Policial"
          className="h-full w-full bg-black object-cover"
        />
      )}

      {/* Overlay "Clique para Ouvir" */}
      {!started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
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
