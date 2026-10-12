/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { checkoutUrl, offer, whatsappUrl, benefits, included, planHighlight } from './sales-content';
test('WhatsApp contact uses the supplied Brazilian phone number', () => { expect(whatsappUrl).toBe('https://wa.me/5555981205146'); });
test('all enrollment links use the supplied Kiwify checkout', () => { expect(checkoutUrl).toBe('https://pay.kiwify.com.br/mPgVeXg'); });
test('monthly subscription costs 39.90 reais per month', () => { expect(offer.monthly).toBe(39.90); });
test('annual subscription costs twelve payments of 29.90 reais', () => { expect([offer.annualInstallments, offer.annualInstallment]).toEqual([12, 29.90]); });
test('reference refund guarantee is seven days', () => { expect(offer.guaranteeDays).toBe(7); });
test('reference support lasts thirty days', () => { expect(offer.supportDays).toBe(30); });
test('the benefits grid no longer lists Diário de Estudos or Questões sobre a Lei Seca', () => { const titles = benefits.map(({ title }) => title); expect(titles).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Flashcards e Revisão Espaçada']); });
test('the replacement highlight carries the requested headline', () => { expect(planHighlight.title).toBe('Faça seus planejamentos para quantos concursos quiser'); });
test('the offer still lists the seven items requested earlier', () => { expect(included).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Diário de Estudos','Questões sobre a Lei Seca','Flashcards e Revisão Espaçada']); });
