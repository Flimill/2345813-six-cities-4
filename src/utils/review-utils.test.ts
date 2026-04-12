import { formatDate } from './review-utils';

describe('Review Utils', () => {
  describe('formatDate', () => {
    it('должен форматировать дату в формате "MMMM YYYY"', () => {
      const isoString = '2023-05-26T12:00:00Z';
      const result = formatDate(isoString);
      expect(result).toBe('May 2023');
    });
  });
});