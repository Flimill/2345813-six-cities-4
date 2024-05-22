import { createReducer } from '@reduxjs/toolkit';
import { setError, setLoadingStatus } from '../action';

type StatusStateType = {
    isLoading: boolean;
    error: string ;
  }

const initialStatusState: StatusStateType = {
  isLoading: false,
  error: '',
};

export const statusReducer = createReducer(initialStatusState,(builder) => {
  builder
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
