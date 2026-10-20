/// <reference types="bun" />
import { test, expect } from 'bun:test';
import { checkoutUrl, offer, whatsappUrl, benefits, included, mentorship, ctaSub, courseScope } from './sales-content';
import * as salesContent from './sales-content';
test('the mentorship section answers the student question with the requested reply', () => { expect(mentorship.question).toBe('Prof. é uma mentoria?'); expect(mentorship.answerLead.startsWith('Não! É um curso em vídeo aulas')).toBe(true); });
test('the "para quem é" audience list is removed from the page content', () => { expect('audience' in salesContent).toBe(false); });
test('WhatsApp contact uses the supplied Brazilian phone number', () => { expect(whatsappUrl).toBe('https://wa.me/5555981205146'); });
test('all "quero ser aprovado" buttons lead to the Study Planner Pro auth page', () => { expect(checkoutUrl).toBe('https://operacaoestudei.lovable.app/auth?mode=signup'); });
test('monthly subscription costs 37.00 reais per month', () => { expect(offer.monthly).toBe(37.00); });
test('annual subscription costs twelve payments of 19.90 reais', () => { expect([offer.annualInstallments, offer.annualInstallment]).toEqual([12, 19.90]); });
test('the course applies to any public exam and the OAB exam', () => { expect(courseScope).toEqual({ publicExams: true, oab: true }); });
test('reference refund guarantee is seven days', () => { expect(offer.guaranteeDays).toBe(7); });
test('reference support lasts thirty days', () => { expect(offer.supportDays).toBe(30); });
test('the benefits grid no longer lists Diário de Estudos or Questões sobre a Lei Seca', () => { const titles = benefits.map(({ title }) => title); expect(titles).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Flashcards e Revisão Espaçada']); });
test('the "planejamentos para quantos concursos quiser" highlight is removed from the page content', () => { expect('planHighlight' in salesContent).toBe(false); });
test('the offer lists every item requested earlier plus the bank analysis item', () => { expect(included).toEqual(['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Diário de Estudos','Questões sobre a Lei Seca','Flashcards e Revisão Espaçada','Raio-X da Banca e Análise Estatística do Que Cai na Prova']); });
test('purchase buttons carry the free account subtext', () => { expect(ctaSub).toBe('Criar conta gratuita'); });
