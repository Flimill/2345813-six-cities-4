import { getSelectedCity, saveSelectedCity, dropSelectedCity, City } from '../../utils/city-storage';
import { START_CITY } from '../../const/const';

describe('City Storage Utils', () => {
  const mockCity: City = 'Amsterdam';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('getSelectedCity', () => {
    it('should return the start city when no city is saved', () => {
      const result = getSelectedCity();
      expect(result).toBe(START_CITY);
    });

    it('should return the saved city from localStorage', () => {
      localStorage.setItem('selected-city', mockCity);
      const result = getSelectedCity();
      expect(result).toBe(mockCity);
    });
  });

  describe('saveSelectedCity', () => {
    it('should save the city to localStorage', () => {
      saveSelectedCity(mockCity);
      const result = localStorage.getItem('selected-city');
      expect(result).toBe(mockCity);
    });
  });

  describe('dropSelectedCity', () => {
    it('should remove the city from localStorage', () => {
      localStorage.setItem('selected-city', mockCity);
      dropSelectedCity();
      const result = localStorage.getItem('selected-city');
      expect(result).toBeNull();
    });
  });
});
