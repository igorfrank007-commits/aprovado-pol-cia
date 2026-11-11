/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { checkoutUrl, monthlyCheckoutUrl, signupUrl, offer, whatsappUrl, benefits, included, mentorship, ctaSub, monthlyCtaSub, courseScope } from './sales-content';
import * as salesContent from './sales-content';
test('the mentorship section answers the student question with the requested reply', () => { expect(mentorship.question).toBe('Prof. é uma mentoria?'); expect(mentorship.answerLead.startsWith('Não! É um curso em vídeo aulas')).toBe(true); });
test('the "para quem é" audience list is removed from the page content', () => { expect('audience' in salesContent).toBe(false); });
test('WhatsApp contact uses the supplied Brazilian phone number', () => { expect(whatsappUrl).toBe('https://wa.me/5555981205146'); });
test('every button goes to the Lei Seca em Questões free-account signup', () => {
  expect(checkoutUrl).toBe('https://lei-seca-em-questoes.netlify.app/#/entrar?aba=cadastrar');
  expect(monthlyCheckoutUrl).toBe('https://lei-seca-em-questoes.netlify.app/#/entrar?aba=cadastrar');
  expect(signupUrl).toBe('https://lei-seca-em-questoes.netlify.app/#/entrar?aba=cadastrar');
});
test('monthly plan shows R$ 29,90 on the buttons', () => { expect(offer.monthly).toBe(29.90); expect(monthlyCtaSub).toBe('Plano mensal · R$ 29,90'); });
test('annual subscription costs twelve payments of 19.80 reais', () => { expect([offer.annualInstallments, offer.annualInstallment]).toEqual([12, 19.80]); });
test('the course applies to any public exam and the OAB exam', () => { expect(courseScope).toEqual({ publicExams: true, oab: true }); });
test('reference refund guarantee is seven days', () => { expect(offer.guaranteeDays).toBe(7); });
test('reference support lasts thirty days', () => { expect(offer.supportDays).toBe(30); });
test('the benefits grid no longer lists Diário de Estudos or Questões sobre a Lei Seca', () => { const titles = benefits.map(({ title }) => title); expect(titles).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Lei Seca em Questões','Flashcards e Revisão Espaçada','Raio-X da Banca e Análise Estatística do Que Cai na Prova']); });
test('the "planejamentos para quantos concursos quiser" highlight is removed from the page content', () => { expect('planHighlight' in salesContent).toBe(false); });
test('the offer lists every item requested earlier plus the bank analysis item', () => { expect(included).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Diário de Estudos','Questões sobre a Lei Seca','Flashcards e Revisão Espaçada','Raio-X da Banca e Análise Estatística do Que Cai na Prova']); });
test('purchase buttons carry the annual plan subtext', () => { expect(ctaSub).toBe('Plano anual · 12x de R$ 19,80'); });
test('the FAQ answers the support question with the 30-day reply', () => {
  const item = salesContent.faqs.find(({ question }) => question === 'Terei suporte ou tira dúvidas?');
  expect(item?.answer).toBe('Sim. O aluno tem acesso ao suporte por 30 dias após o início do curso.');
});
test('the old "Como começo ou tiro outras dúvidas?" FAQ item is removed', () => {
  const questions = salesContent.faqs.map(({ question }) => question);
  expect(questions.some((question) => question.startsWith('Como começo'))).toBe(false);
  const answers = salesContent.faqs.map(({ answer }) => answer).join(' ');
  expect(answers.includes('Clique em')).toBe(false);
});
test('the FAQ answers the support question with the 30-day reply', () => {
  const item = salesContent.faqs.find(({ question }) => question === 'Terei suporte ou tira dúvidas?');
  expect(item?.answer).toBe('Sim. O aluno tem acesso ao suporte por 30 dias após o início do curso.');
});
test('the old "Como começo ou tiro outras dúvidas?" FAQ item is removed', () => {
  const questions = salesContent.faqs.map(({ question }) => question);
  expect(questions.some((question) => question.startsWith('Como começo'))).toBe(false);
  const answers = salesContent.faqs.map(({ answer }) => answer).join(' ');
  expect(answers.includes('Clique em')).toBe(false);
});
