import { createReducer } from '@reduxjs/toolkit';
import { OfferCardData } from '../../types/types';
import { decrementFavoriteNumber, incrementFavoriteNumber, setFavoriteNumber, setFavoriteOfferList, setFavoritesLoading } from '../action';

type FavoriteStateType = {
    favoriteOfferList: OfferCardData[];
    favoriteNumber: number;
    isFavoritesLoading: boolean;
  }

const initialFavoriteState: FavoriteStateType = {

  favoriteOfferList: [],
  favoriteNumber: 0,
  isFavoritesLoading: false,
};

export const favoriteReducer = createReducer(initialFavoriteState,(builder) => {
  builder
    .addCase(setFavoriteOfferList, (state, action) => {
      state.favoriteOfferList = action.payload;
    })
    .addCase(incrementFavoriteNumber, (state) => {
      state.favoriteNumber += 1;
    })
    .addCase(decrementFavoriteNumber, (state) => {
      state.favoriteNumber -= 1;
    })
    .addCase(setFavoriteNumber, (state, action) => {
      state.favoriteNumber = action.payload;
    })
    .addCase(setFavoritesLoading, (state, action) => {
      state.isFavoritesLoading = action.payload;
    });
});
