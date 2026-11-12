/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { checkoutUrl, monthlyCheckoutUrl, signupUrl, offer, whatsappUrl, benefits, included, mentorship, ctaSub, monthlyCtaSub, faqs } from './sales-content';
test('the mentorship section answers the format question: the product is a study site, not a video course', () => { expect(mentorship.question).toBe('Isso é um curso em vídeo?'); expect(mentorship.answerLead.startsWith('Não. É um site de estudo')).toBe(true); });
test('WhatsApp contact uses the supplied Brazilian phone number', () => { expect(whatsappUrl).toBe('https://wa.me/5555981205146'); });
test('every button goes to the Legislação Estratégica em Questões free-account signup', () => {
  expect(checkoutUrl).toBe('https://legislacao-estrategica-em-questoes.netlify.app/#/entrar?aba=cadastrar');
  expect(monthlyCheckoutUrl).toBe('https://legislacao-estrategica-em-questoes.netlify.app/#/entrar?aba=cadastrar');
  expect(signupUrl).toBe('https://legislacao-estrategica-em-questoes.netlify.app/#/entrar?aba=cadastrar');
});
test('monthly plan is R$ 29,90 charged every month', () => { expect(offer.monthly).toBe(29.90); expect(monthlyCtaSub).toBe('Plano mensal · R$ 29,90'); });
test('annual plan is twelve payments of 19.80 reais', () => { expect([offer.annualInstallments, offer.annualInstallment]).toEqual([12, 19.80]); });
test('the tools listed match the Legislação Estratégica em Questões site', () => { const titles = benefits.map(({ title }) => title); expect(titles).toEqual(['Vade Mecum de Questões da Lei Seca','2,7 milhões de questões de concursos','Cronograma individual','Edital verticalizado','Raio-X das provas','Cadernos, anotações e estatísticas']); });
test('the included list names only tools the site has', () => { expect(included).toContain('Cronograma individual com cronômetro'); expect(included).toContain('Edital verticalizado'); expect(included.some((item) => item.includes('Flashcards') || item.includes('vídeo') || item.includes('Diário'))).toBe(false); });
test('purchase buttons carry the annual plan subtext', () => { expect(ctaSub).toBe('Plano anual · 12x de R$ 19,80'); });
test('the guarantee is seven days with full refund, and the FAQ states it', () => {
  expect(offer.guaranteeDays).toBe(7);
  const item = faqs.find(({ question }) => question === 'O curso tem garantia?');
  expect(item?.answer.includes('7 dias')).toBe(true);
  expect(item?.answer.includes('devolvido integralmente')).toBe(true);
});
test('the FAQ says the product is not a video course', () => {
  const item = faqs.find(({ question }) => question === 'Isso é um curso em vídeo?');
  expect(item?.answer.startsWith('Não.')).toBe(true);
});
