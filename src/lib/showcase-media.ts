import { benefits } from '@/lib/sales-content';
import aula03Video from '@/assets/aula-03-planejamento-edital.mp4.asset.json';
import aula03Poster from '@/assets/aula-03-poster.webp.asset.json';
import aula03EditalVideo from '@/assets/aula-03-edital-verticalizado.mp4.asset.json';
import aula03EditalPoster from '@/assets/aula-03-edital-poster.webp.asset.json';
import progressStatistics from '@/assets/painel-de-estudos-completo.png.asset.json';
import flashcardsReview from '@/assets/flashcards-revisao-banner.png.asset.json';
import aula02Video from '@/assets/aula-02-visao-geral.mp4.asset.json';
import aula02Poster from '@/assets/aula-02-poster.webp.asset.json';
import aula02Captions from '@/assets/aula-02-visao-geral.vtt.asset.json';

// Mídia exibida na moldura de cada aba da vitrine.
// ratio = largura/altura original da mídia; stretch estica a largura para preencher a moldura.
export type ShowcaseMedia = {
  kind: 'image' | 'video';
  label: string;
  ratio: number;
  stretch: number;
  maxW?: number;
  asset: { url: string };
  poster?: { url: string };
  captions?: { url: string };
};

// Recursos exibidos na vitrine: sem "Diário de Estudos" e sem "Questões sobre a Lei Seca".
const removedTitles = ['Diário de Estudos', 'Questões sobre a Lei Seca'];
export const showcaseFeatures = benefits.filter(({ title }) => !removedTitles.includes(title));

const mediaByTitle: Record<string, ShowcaseMedia[]> = {
  'Curso Completo em Vídeo Aulas': [
    { kind: 'video', label: 'Aula 02 - Visão Geral da Plataforma', ratio: 1920 / 1080, stretch: 1, maxW: 960, asset: aula02Video, poster: aula02Poster, captions: aula02Captions },
  ],
  // Aula 03 com as legendas já gravadas no próprio vídeo (sem trilha VTT para não duplicar).
  'Cronograma e Planejamento Automáticos': [
    { kind: 'video', label: 'Aula 03 - Planejamento e Edital Verticalizado', ratio: 1920 / 1080, stretch: 1, maxW: 960, asset: aula03Video, poster: aula03Poster },
  ],
  // Aula 03 (trecho do edital) com as legendas gravadas no próprio vídeo.
  'Edital Verticalizado': [{ kind: 'video', label: 'Aula 03 - Edital Verticalizado', ratio: 1920 / 1080, stretch: 1, maxW: 960, asset: aula03EditalVideo, poster: aula03EditalPoster }],
  'Estatísticas de Progresso': [{ kind: 'image', label: 'Estatísticas de Progresso', ratio: 452 / 707, stretch: 1.25, maxW: 560, asset: progressStatistics }],
  'Flashcards e Revisão Espaçada': [{ kind: 'image', label: 'Flashcards e Revisão Espaçada', ratio: 1536 / 1024, stretch: 1, asset: flashcardsReview }],
};

export function showcaseMediaFor(title: string): ShowcaseMedia[] {
  return mediaByTitle[title] ?? [];
}
