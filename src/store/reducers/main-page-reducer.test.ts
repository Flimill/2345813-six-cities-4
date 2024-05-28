import { describe, it, expect } from 'vitest';
import { changeSortingOption, updateCity } from '../action';
import { mainPageReducer } from './main-page-reducer';
import { START_CITY, START_SORTING_OPTION } from '../../const/const';

describe('mainPageReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      city: START_CITY,
      sortingOption: START_SORTING_OPTION,
    };
    expect(mainPageReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle updateCity', () => {
    const initialState = {
      city: START_CITY,
      sortingOption: START_SORTING_OPTION,
    };
    const newCity = 'New York';
    const action = updateCity(newCity);
    const expectedState = {
      city: newCity,
      sortingOption: START_SORTING_OPTION,
    };
    expect(mainPageReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle changeSortingOption', () => {
    const initialState = {
      city: START_CITY,
      sortingOption: START_SORTING_OPTION,
    };
    const newSortingOption = 'Price: low to high';
    const action = changeSortingOption(newSortingOption);
    const expectedState = {
      city: START_CITY,
      sortingOption: newSortingOption,
    };
    expect(mainPageReducer(initialState, action)).toEqual(expectedState);
  });
});
