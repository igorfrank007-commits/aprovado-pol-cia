// ---------------------------------------------------------------------------
// VÍDEO DA PÁGINA DE VENDAS
// O vídeo não é mais hospedado localmente: ele vem do Google Drive e é
// renderizado pelo `VslPlayer`, que já cuida de autoplay mudo,
// overlay "Clique para Ouvir", barra de progresso, tela cheia e do gatilho de
// oferta aos 26:53. Este arquivo mantém o nome antigo para não quebrar imports.
// Sem nenhuma mídia local: os assets antigos (method-video.mp4/webm e poster)
// não existem mais no projeto.
// (sem mídia local: method-video.mp4/webm e video-poster foram removidos)

// ---------------------------------------------------------------------------
export { VslPlayer as SalesVideo } from '@/components/vsl-player';

