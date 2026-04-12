import { getOfferListByCity, getPointByCity, getSortedList } from './offers-util';
import { OfferCardData } from '../types/types';
import { CITY_POINTS } from '../const/const';

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

describe('Утилиты для работы с предложениями', () => {
  describe('getOfferListByCity', () => {
    it('должен вернуть предложения, отфильтрованные по городу', () => {
      const result = getOfferListByCity('Amsterdam', mockOfferList);
      expect(result).toEqual([mockOfferList[0]]);
    });
  });

  describe('getPointByCity', () => {
    it('должен вернуть точку города для указанного города из списка предложений', () => {
      const result = getPointByCity('Amsterdam', mockOfferList);
      expect(result).toEqual(mockOfferList[0].city);
    });

    it('должен вернуть точку города по умолчанию, если город не найден в списке предложений', () => {
      const result = getPointByCity('Cologne', mockOfferList);
      expect(result).toEqual(CITY_POINTS['Cologne']);
    });
  });

  describe('getSortedList', () => {
    it('должен вернуть предложения, отсортированные по цене: от низкой к высокой', () => {
      const result = getSortedList(mockOfferList, 'Price: low to high');
      expect(result).toEqual([mockOfferList[0], mockOfferList[1]]);
    });

    it('должен вернуть предложения, отсортированные по цене: от высокой к низкой', () => {
      const result = getSortedList(mockOfferList, 'Price: high to low');
      expect(result).toEqual([mockOfferList[1], mockOfferList[0]]);
    });

    it('должен вернуть предложения, отсортированные по рейтингу: от высокого к низкому', () => {
      const result = getSortedList(mockOfferList, 'Top rated first');
      expect(result).toEqual([mockOfferList[1], mockOfferList[0]]);
    });

    it('должен вернуть исходный список, когда выбран вариант "Popular"', () => {
      const result = getSortedList(mockOfferList, 'Popular');
      expect(result).toEqual(mockOfferList);
    });
  });
});