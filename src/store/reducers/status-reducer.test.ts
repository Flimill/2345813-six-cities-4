import { describe, it, expect } from 'vitest';
import { setError, setLoadingStatus } from '../action';
import { statusReducer } from './status-reducer';

describe('statusReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = {
      isLoading: false,
      error: '',
    };
    expect(statusReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обработать setLoadingStatus', () => {
    const initialState = {
      isLoading: false,
      error: '',
    };
    const loadingStatus = true;
    const action = setLoadingStatus(loadingStatus);
    const expectedState = {
      isLoading: loadingStatus,
      error: '',
    };
    expect(statusReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обработать setError', () => {
    const initialState = {
      isLoading: false,
      error: '',
    };
    const errorMessage = 'Something went wrong';
    const action = setError(errorMessage);
    const expectedState = {
      isLoading: false,
      error: errorMessage,
    };
    expect(statusReducer(initialState, action)).toEqual(expectedState);
  });
});