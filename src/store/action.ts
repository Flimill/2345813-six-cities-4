import { createAction } from '@reduxjs/toolkit';
import { FullOfferCardData, OfferCardData, Point, Reviews, UserData } from '../types/types';

export const updateCity = createAction('city/update', (name: string) => ({
  payload: name,
}));

export const loadOffers = createAction('offers/load', (values: OfferCardData[]) => ({
  payload: values,
}));

export const setFavoriteOfferList = createAction('favorites/setOfferList', (values: OfferCardData[]) => ({
  payload: values,
}));

export const setLoadingStatus = createAction('status/setLoading', (value: boolean) => ({
  payload: value,
}));

export const setReviewLoadingStatus = createAction('status/setReviewLoading', (value: boolean) => ({
  payload: value,
}));

export const setError = createAction('status/setError', (value: string) => ({
  payload: value,
}));

export const changeSelectedPoint = createAction('map/changeSelectedPoint', (point: Point | undefined) => ({
  payload: point,
}));

export const changeSortingOption = createAction('sorting/changeOption', (option: string) => ({
  payload: option,
}));

export const setSelectedOffer = createAction('offers/setSelected', (offer: FullOfferCardData) => ({
  payload: offer,
}));

export const setReviews = createAction('reviews/setAll', (reviews: Reviews) => ({
  payload: reviews,
}));

export const setAuthorizationStatus = createAction('user/setAuthorizationStatus', (authorizationStatus: boolean) => ({
  payload: authorizationStatus,
}));

export const setUserData = createAction('user/setData', (userData: UserData | undefined) => ({
  payload: userData,
}));

export const incrementFavoriteNumber = createAction('favorites/incrementNumber');
export const decrementFavoriteNumber = createAction('favorites/decrementNumber');

export const setFavoriteNumber = createAction('favorites/setNumber', (number: number) => ({
  payload: number,
}));

export const setFavoritesLoading = createAction('favorites/setLoading', (status: boolean) => ({
  payload: status,
}));
