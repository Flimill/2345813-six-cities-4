import { describe, it, expect } from 'vitest';
import { changeSortingOption, updateCity } from '../action';
import { mainPageReducer } from './main-page-reducer';
import { START_CITY, START_SORTING_OPTION } from '../../const/const';

describe('mainPageReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = {
      city: START_CITY,
      sortingOption: START_SORTING_OPTION,
    };
    expect(mainPageReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать updateCity', () => {
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

  it('должен обработать changeSortingOption', () => {
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