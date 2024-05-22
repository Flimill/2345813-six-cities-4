import { createReducer } from '@reduxjs/toolkit';
import { START_CITY, START_SORTING_OPTION } from '../../const/const';
import { changeSortingOption, updateCity } from '../action';

type MainPageStateType = {
    city: string;
    sortingOption: string;
  }

const initialMainPageState: MainPageStateType = {
  city: START_CITY,
  sortingOption: START_SORTING_OPTION,
};

export const mainPageReducer = createReducer(initialMainPageState,(builder) => {
  builder
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortingOption, (state, action) => {
      state.sortingOption = action.payload;
    });

});
