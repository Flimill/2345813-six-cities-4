import {createReducer} from '@reduxjs/toolkit';
import { updateCity,updateOfferList } from './action';
import cityOFFERS from '../mocks/city-OFFERS';
import { START_CITY } from '../const';


const initialState = {
  city: START_CITY,
  offerList: cityOFFERS[START_CITY]
};

export const reducer = createReducer(initialState,(builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(updateOfferList, (state, action) => {
      state.offerList = cityOFFERS[action.payload];
    });

});
