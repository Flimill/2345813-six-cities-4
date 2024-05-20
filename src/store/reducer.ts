import {createReducer} from '@reduxjs/toolkit';
import { changeSelectedPoint, changeSortingOption, loadOffers, setError, setLoadingStatus, setReviews, setSelectedOffer, updateCity } from './action';
import { START_CITY, START_SORTING_OPTION } from '../const/const';
import { FullOfferCardData, OfferCardData, Point, Reviews } from '../types/types';

type StateType = {
  city: string;
  offerList: OfferCardData[];
  sortingOption: string;
  selectedPoint: Point|undefined;
  selectedOffer: FullOfferCardData | undefined;
  isLoading: boolean;
  error: string | null;
  reviews: Reviews;
}

const initialState: StateType = {
  city: START_CITY,
  offerList: [],
  sortingOption: START_SORTING_OPTION,
  selectedOffer: undefined,
  selectedPoint: undefined,
  isLoading: false,
  error: null,
  reviews: [],
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
    });
});
