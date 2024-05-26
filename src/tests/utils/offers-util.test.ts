import { getOfferListByCity, getPointByCity, getSortedList } from '../../utils/offers-util';
import { OfferCardData } from '../../types/types';
import { CITY_POINTS } from '../../const/const';

const mockOfferList: OfferCardData[] = [
  {
    id: '1',
    title: 'Offer 1',
    type: 'apartment',
    price: 100,
    city: { name: 'Amsterdam', location: { latitude: 52.37403, longitude: 4.88969, zoom: 12 } },
    location: { latitude: 52.37403, longitude: 4.88969, zoom: 12 },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img1.jpg',
  },
  {
    id: '2',
    title: 'Offer 2',
    type: 'apartment',
    price: 200,
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 } },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    previewImage: 'img2.jpg',
  },
];

describe('Offers Util Functions', () => {
  describe('getOfferListByCity', () => {
    it('should return offers filtered by city', () => {
      const result = getOfferListByCity('Amsterdam', mockOfferList);
      expect(result).toEqual([mockOfferList[0]]);
    });
  });

  describe('getPointByCity', () => {
    it('should return the city point for a given city from the offer list', () => {
      const result = getPointByCity('Amsterdam', mockOfferList);
      expect(result).toEqual(mockOfferList[0].city);
    });

    it('should return the default city point if the city is not in the offer list', () => {
      const result = getPointByCity('Cologne', mockOfferList);
      expect(result).toEqual(CITY_POINTS['Cologne']);
    });
  });

  describe('getSortedList', () => {
    it('should return offers sorted by price low to high', () => {
      const result = getSortedList(mockOfferList, 'Price: low to high');
      expect(result).toEqual([mockOfferList[0], mockOfferList[1]]);
    });

    it('should return offers sorted by price high to low', () => {
      const result = getSortedList(mockOfferList, 'Price: high to low');
      expect(result).toEqual([mockOfferList[1], mockOfferList[0]]);
    });

    it('should return offers sorted by rating from high to low', () => {
      const result = getSortedList(mockOfferList, 'Top rated first');
      expect(result).toEqual([mockOfferList[1], mockOfferList[0]]);
    });

    it('should return the original list when selectedOption is "Popular"', () => {
      const result = getSortedList(mockOfferList, 'Popular');
      expect(result).toEqual(mockOfferList);
    });
  });
});
