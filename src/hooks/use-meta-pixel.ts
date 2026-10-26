import { useEffect, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { setupMetaPixel, trackMetaEvent, trackViewContent } from '@/lib/meta-pixel';

/**
 * Hook que cuida do Meta Pixel em todo o app:
 * - Chama setupMetaPixel() na montagem do componente raiz (guarda contra dupla inicialização).
 * - Dispara PageView na primeira abertura e em cada mudança real de rota (sem duplicar).
 * - Dispara ViewContent (uma única vez por sessão) quando a rota é '/' (página de vendas).
 */
export function useMetaPixelTracking() {
  const location = useLocation();
  const path = location.pathname;
  const initialRef = useRef(true);

  // Inicializa o script do Pixel uma única vez ao montar
  useEffect(() => {
    setupMetaPixel();
  }, []);

  // Dispara PageView na primeira abertura e em cada mudança real de rota
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      // Primeira renderização: dispara PageView + ViewContent (se for página de vendas)
      trackMetaEvent('PageView');
      if (path === '/') trackViewContent();
      return;
    }
    // Navegação SPA: dispara PageView (evita duplicar na primeira renderização)
    trackMetaEvent('PageView');
    if (path === '/') trackViewContent();
  }, [path]);
}
