import { getSelectedCity, saveSelectedCity, dropSelectedCity, City } from './city-storage';
import { START_CITY } from '../const/const';

describe('City Storage Utils', () => {
  const mockCity: City = 'Amsterdam';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('getSelectedCity', () => {
    it('должен вернуть начальный город, когда город не сохранён', () => {
      const result = getSelectedCity();
      expect(result).toBe(START_CITY);
    });

    it('должен вернуть сохранённый город из localStorage', () => {
      localStorage.setItem('selected-city', mockCity);
      const result = getSelectedCity();
      expect(result).toBe(mockCity);
    });
  });

  describe('saveSelectedCity', () => {
    it('должен сохранить город в localStorage', () => {
      saveSelectedCity(mockCity);
      const result = localStorage.getItem('selected-city');
      expect(result).toBe(mockCity);
    });
  });

  describe('dropSelectedCity', () => {
    it('должен удалить город из localStorage', () => {
      localStorage.setItem('selected-city', mockCity);
      dropSelectedCity();
      const result = localStorage.getItem('selected-city');
      expect(result).toBeNull();
    });
  });
});