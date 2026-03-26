import { it, expect, describe } from 'vitest';
import { formatMoney } from './Money';

describe('formateMoney', () => {
it('formats 1999 as ₹1999', () => {
   expect(formatMoney(1999)).toBe('₹1999');
});
})
