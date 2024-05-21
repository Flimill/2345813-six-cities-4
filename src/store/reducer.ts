import {createReducer} from '@reduxjs/toolkit';
import { changeSelectedPoint, changeSortingOption, loadOffers, setAuthorizationStatus, setError, setFavoriteOfferList, setLoadingStatus, setReviews, setSelectedOffer, setUserData, updateCity } from './action';
import { START_CITY, START_SORTING_OPTION } from '../const/const';
import { FullOfferCardData, OfferCardData, Point, Reviews, UserData } from '../types/types';

type StateType = {
  city: string;
  offerList: OfferCardData[];
  favoriteOfferList: OfferCardData[];
  sortingOption: string;
  selectedPoint: Point|undefined;
  selectedOffer: FullOfferCardData | undefined;
  isLoading: boolean;
  error: string | null;
  reviews: Reviews;
  authorizationStatus:boolean;
  userData: UserData|undefined;
}

const initialState: StateType = {
  city: START_CITY,
  offerList: [],
  favoriteOfferList: [],
  sortingOption: START_SORTING_OPTION,
  selectedOffer: undefined,
  selectedPoint: undefined,
  isLoading: false,
  error: null,
  reviews: [],
  authorizationStatus: false,
  userData: undefined
};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offerList = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    })
    .addCase(changeSortingOption, (state, action) => {
      state.sortingOption = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setFavoriteOfferList, (state, action) => {
      state.favoriteOfferList = action.payload;
    });
});
