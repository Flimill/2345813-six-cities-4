import {createReducer} from '@reduxjs/toolkit';
import { updateCity,updateOfferList } from './action';
import { START_CITY } from '../const';
import {getOfferListByCity} from '../utils/offers-util';
import OFFERS from '../mocks/offers';


const initialState = {
  city: START_CITY,
  offerList: getOfferListByCity(START_CITY, OFFERS)
};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(updateOfferList, (state, action) => {
      state.offerList = getOfferListByCity(action.payload, OFFERS);
    });

});
