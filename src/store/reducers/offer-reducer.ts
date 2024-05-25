import { createReducer } from '@reduxjs/toolkit';
import { FullOfferCardData, OfferCardData } from '../../types/types';
import { loadOffers, setSelectedOffer } from '../action';

type OfferStateType = {
    offerList: OfferCardData[];
    selectedOffer: FullOfferCardData | undefined;
  }

const initialOfferState: OfferStateType = {

  offerList: [],
  selectedOffer: undefined,
};

export const offerReducer = createReducer(initialOfferState,(builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offerList = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    });
});
