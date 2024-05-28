import { describe, it, expect } from 'vitest';
import { decrementFavoriteNumber, incrementFavoriteNumber, setFavoriteNumber, setFavoriteOfferList, setFavoritesLoading } from '../action';
import { OfferCardData } from '../../types/types';
import { favoriteReducer } from './favorite-reducer';

describe('favoriteReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    expect(favoriteReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFavoriteOfferList', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    const newFavoriteOfferList: OfferCardData[] = [
      { id: '1', title: 'Offer 1', type: 'apartment', price: 100, city: { name: 'City1', location: { latitude: 0, longitude: 0, zoom: 10 } }, location: { latitude: 0, longitude: 0, zoom: 10 }, isFavorite: true, isPremium: false, rating: 4.5, previewImage: 'img1.jpg' },
      { id: '2', title: 'Offer 2', type: 'house', price: 200, city: { name: 'City2', location: { latitude: 0, longitude: 0, zoom: 10 } }, location: { latitude: 0, longitude: 0, zoom: 10 }, isFavorite: true, isPremium: true, rating: 4.0, previewImage: 'img2.jpg' }
    ];
    const action = setFavoriteOfferList(newFavoriteOfferList);
    const expectedState = {
      favoriteOfferList: newFavoriteOfferList,
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    expect(favoriteReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle incrementFavoriteNumber', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    const action = incrementFavoriteNumber();
    const expectedState = {
      favoriteOfferList: [],
      favoriteNumber: 1,
      isFavoritesLoading: false,
    };
    expect(favoriteReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle decrementFavoriteNumber', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 1,
      isFavoritesLoading: false,
    };
    const action = decrementFavoriteNumber();
    const expectedState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    expect(favoriteReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setFavoriteNumber', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    const newFavoriteNumber = 5;
    const action = setFavoriteNumber(newFavoriteNumber);
    const expectedState = {
      favoriteOfferList: [],
      favoriteNumber: newFavoriteNumber,
      isFavoritesLoading: false,
    };
    expect(favoriteReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setFavoritesLoading', () => {
    const initialState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: false,
    };
    const newLoadingStatus = true;
    const action = setFavoritesLoading(newLoadingStatus);
    const expectedState = {
      favoriteOfferList: [],
      favoriteNumber: 0,
      isFavoritesLoading: newLoadingStatus,
    };
    expect(favoriteReducer(initialState, action)).toEqual(expectedState);
  });
});
