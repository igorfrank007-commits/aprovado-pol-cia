import { benefits } from '@/lib/sales-content';
// Prints da landing que mostram as mesmas telas de cronograma e edital (o Legislação Estratégica em Questões tem as mesmas funções).
import editalAsset from '@/assets/edital-verticalizado.png.asset.json';
import planejamentoAsset from '@/assets/planejamento-cronograma.png.asset.json';

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

// Recursos exibidos na vitrine: os mesmos da seção de benefícios (ferramentas do Legislação Estratégica em Questões).
export const showcaseFeatures = benefits;

// Prints das telas do Legislação Estratégica em Questões (pasta public/lei-seca) e o vídeo de apresentação do próprio site, referenciado pelo endereço dele.
const LEI_SECA = 'https://legislacao-estrategica-em-questoes.netlify.app';
const TELA = 941 / 463; // proporção dos prints tirados do site

const mediaByTitle: Record<string, ShowcaseMedia[]> = {
  'Vade Mecum de Questões da Lei Seca': [
    { kind: 'video', label: 'Vídeo de apresentação', ratio: 1080 / 1350, stretch: 1, maxW: 420, asset: { url: `${LEI_SECA}/video-home.mp4` }, poster: { url: `${LEI_SECA}/video-home.jpg` } },
    { kind: 'image', label: 'Questões da lei seca', ratio: TELA, stretch: 1, asset: { url: '/lei-seca/questoes.jpg' } },
  ],
  '2,7 milhões de questões de concursos': [
    { kind: 'image', label: 'Questões de concursos', ratio: TELA, stretch: 1, asset: { url: '/lei-seca/concursos.jpg' } },
  ],
  'Cronograma individual': [
    { kind: 'image', label: 'Cronograma individual', ratio: 733 / 1920, stretch: 1, maxW: 380, asset: planejamentoAsset },
  ],
  'Edital verticalizado': [
    { kind: 'image', label: 'Edital verticalizado', ratio: 1740 / 907, stretch: 1, asset: editalAsset },
  ],
  'Raio-X das provas': [
    { kind: 'image', label: 'Relatório de Raio-X do Legislação Estratégica em Questões', ratio: 720 / 1018, stretch: 1, maxW: 420, asset: { url: '/lei-seca/raio-x.jpg' } },
  ],
  'Cadernos, anotações e estatísticas': [
    { kind: 'image', label: 'Cadernos', ratio: TELA, stretch: 1, asset: { url: '/lei-seca/cadernos.jpg' } },
  ],
};

export function showcaseMediaFor(title: string): ShowcaseMedia[] {
  return mediaByTitle[title] ?? [];
}
