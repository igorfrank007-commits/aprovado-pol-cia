/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { showcaseFeatures, showcaseMediaFor } from './showcase-media';

test('the showcase lists the six tools of the Lei Seca em Questões site', () => {
  expect(showcaseFeatures.map(({ title }) => title)).toEqual(['Vade Mecum de Questões da Lei Seca', '2,7 milhões de questões de concursos', 'Cronograma individual', 'Edital verticalizado', 'Raio-X das provas', 'Cadernos, anotações e estatísticas']);
});

test('every tool has at least one demonstration media', () => {
  for (const { title } of showcaseFeatures) {
    expect(showcaseMediaFor(title).length).toBeGreaterThan(0);
  }
});

test('the Vade Mecum tab references the presentation video of the Lei Seca site, with its cover', () => {
  const [video] = showcaseMediaFor('Vade Mecum de Questões da Lei Seca');
  expect(video.kind).toBe('video');
  expect(video.asset.url).toBe('https://lei-seca-em-questoes.netlify.app/video-home.mp4');
  expect(video.poster?.url).toBe('https://lei-seca-em-questoes.netlify.app/video-home.jpg');
});

test('the planning, edital and Raio-X tabs show screenshots of the Lei Seca site', () => {
  expect(showcaseMediaFor('Cronograma individual')[0].asset.url).toBe('/lei-seca/cronograma.jpg');
  expect(showcaseMediaFor('Edital verticalizado')[0].asset.url).toBe('/lei-seca/edital.jpg');
  expect(showcaseMediaFor('Raio-X das provas')[0].asset.url).toBe('/lei-seca/raio-x.jpg');
});
