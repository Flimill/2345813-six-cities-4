import { formatDate } from './review-utils';

describe('Review Utils', () => {
  describe('formatDate', () => {
    it('should format the date in "MMMM YYYY" format', () => {
      const isoString = '2023-05-26T12:00:00Z';
      const result = formatDate(isoString);
      expect(result).toBe('May 2023');
    });
  });
});
