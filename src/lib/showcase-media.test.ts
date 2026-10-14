/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { showcaseFeatures, showcaseMediaFor } from './showcase-media';

test('the showcase keeps the five platform features', () => {
  expect(showcaseFeatures.map(({ title }) => title)).toEqual(['Curso Completo em Vídeo Aulas', 'Cronograma e Planejamento Automáticos', 'Edital Verticalizado', 'Estatísticas de Progresso', 'Flashcards e Revisão Espaçada']);
});

test('the vídeo aulas tab shows the supplied lesson video instead of an image', () => {
  const media = showcaseMediaFor('Curso Completo em Vídeo Aulas');
  expect(media.map(({ kind }) => kind)).toEqual(['video']);
  expect(media[0].asset.url.endsWith('/aula-02-visao-geral.mp4')).toBe(true);
});

test('the lesson video carries the attached captions and its cover image', () => {
  const [video] = showcaseMediaFor('Curso Completo em Vídeo Aulas');
  expect(video.captions?.url.endsWith('/aula-02-visao-geral.vtt')).toBe(true);
  expect(video.poster?.url.endsWith('/aula-02-poster.webp')).toBe(true);
});

test('the other tabs keep their demonstration images', () => {
  const others = ['Cronograma e Planejamento Automáticos', 'Edital Verticalizado', 'Estatísticas de Progresso', 'Flashcards e Revisão Espaçada'];
  for (const title of others) {
    const media = showcaseMediaFor(title);
    expect(media.length).toBeGreaterThan(0);
    expect(media.every(({ kind }) => kind === 'image')).toBe(true);
  }
});
