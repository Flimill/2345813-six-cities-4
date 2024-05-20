import {createAction} from '@reduxjs/toolkit';
import { FullOfferCardData, OfferCardData, Point, Reviews } from '../types/types';

export const updateCity = createAction('createAction', (name:string) => ({
  payload: name,
}));
export const loadOffers = createAction('LOAD_OFFERS', (value: OfferCardData[]) => ({
  payload: value
}));

export const setLoadingStatus = createAction('SET_QUESTIONS_DATA_LOADING_STATUS', (value: boolean) => ({
  payload: value
}));

export const setError = createAction('SET_ERROR', (value: string | null) => ({
  payload: value
}));

export const changeSelectedPoint = createAction('CHANGE_SELECTED_POINT', (point: Point|undefined) => ({
  payload: point
}));
export const changeSortingOption = createAction('CHANGE_SORTING_OPTION', (option: string) => ({
  payload: option
}));
export const setSelectedOffer = createAction('SET_SELECTED_OFFER', (offer: FullOfferCardData) => ({
  payload: offer
}));
export const setReviews = createAction('SET_REVIEWS', (reviews: Reviews) => ({
  payload: reviews
}));