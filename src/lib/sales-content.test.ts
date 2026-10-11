import { test, expect } from 'bun:test';
import { checkoutUrl, offer } from './sales-content';
test('all enrollment links use the supplied Kiwify checkout', () => { expect(checkoutUrl).toBe('https://pay.kiwify.com.br/mPgVeXg'); });
test('reference cash offer is 197 reais', () => { expect(offer.cash).toBe(197); });
test('reference installment offer is twelve payments of 19.70 reais', () => { expect([offer.installments, offer.installment]).toEqual([12, 19.70]); });
test('reference original price is 997 reais', () => { expect(offer.original).toBe(997); });
test('reference refund guarantee is seven days', () => { expect(offer.guaranteeDays).toBe(7); });
test('reference support lasts thirty days', () => { expect(offer.supportDays).toBe(30); });
