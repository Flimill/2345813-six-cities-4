import { describe, it, expect } from 'vitest';
import { loadOffers, setSelectedOffer } from '../../../store/action';
import { offerReducer } from '../../../store/reducers/offer-reducer';
import { OfferCardData, FullOfferCardData } from '../../../types/types';

describe('offerReducer', () => {
    it('should return the initial state', () => {
      const initialState = {
        offerList: [],
        selectedOffer: undefined,
      };
      expect(offerReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle loadOffers', () => {
      const initialState = {
        offerList: [],
        selectedOffer: undefined,
      };
      const newOffers: OfferCardData[] = [
        { 
          id: '1', 
          title: 'Offer 1', 
          type: 'apartment', 
          price: 100, 
          city: { name: 'City 1', location: { latitude: 0, longitude: 0, zoom: 10 } },
          location: { latitude: 0, longitude: 0, zoom: 10 },
          isFavorite: false,
          isPremium: false,
          rating: 4.5,
          previewImage: 'img1.jpg'
        },
        { 
          id: '2', 
          title: 'Offer 2', 
          type: 'house', 
          price: 200, 
          city: { name: 'City 2', location: { latitude: 1, longitude: 1, zoom: 11 } },
          location: { latitude: 1, longitude: 1, zoom: 11 },
          isFavorite: true,
          isPremium: true,
          rating: 4.7,
          previewImage: 'img2.jpg'
        },
      ];
      const action = loadOffers(newOffers);
      const expectedState = {
        offerList: newOffers,
        selectedOffer: undefined,
      };
      expect(offerReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle setSelectedOffer', () => {
      const initialState = {
        offerList: [],
        selectedOffer: undefined,
      };
      const selectedOffer: FullOfferCardData = {
        id: '1',
        title: 'Offer 1',
        type: 'apartment',
        price: 100,
        city: { name: 'City 1', location: { latitude: 0, longitude: 0, zoom: 10 } },
        location: { latitude: 0, longitude: 0, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        description: 'A nice place',
        bedrooms: 2,
        goods: ['Wifi', 'TV'],
        host: { name: 'Host 1', avatarUrl: 'host1.jpg', isPro: true },
        images: ['img1.jpg', 'img2.jpg'],
        maxAdults: 4
      };
      const action = setSelectedOffer(selectedOffer);
      const expectedState = {
        offerList: [],
        selectedOffer: selectedOffer,
      };
      expect(offerReducer(initialState, action)).toEqual(expectedState);
    });
  });