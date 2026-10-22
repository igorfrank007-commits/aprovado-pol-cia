import { useEffect } from 'react';

// Elementos da página que recebem animação de entrada (fade-in + slide).
// Limitado à área liberada após o delay para não afetar a hero com o player.
const REVEAL_ROOT = '#conteudo-liberado';
const REVEAL_SELECTOR = ['[data-reveal]', 'h2', 'h3', 'article', 'li', 'img']
  .map((selector) => `${REVEAL_ROOT} ${selector}`)
  .join(', ');

/**
 * Aplica a classe `.reveal` nos cards e textos da página e revela cada um
 * com fade-in + slide quando entra na viewport (IntersectionObserver).
 */
export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (nodes.length === 0) return;

    // Evita animar um elemento e seus descendentes ao mesmo tempo.
    const selected = new Set(nodes);
    const targets = nodes.filter((element) => {
      let parent = element.parentElement;
      while (parent) {
        if (selected.has(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });

    targets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add('reveal-in');
          observer.unobserve(target);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [enabled]);
}
