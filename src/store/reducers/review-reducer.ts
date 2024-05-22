import { createReducer } from '@reduxjs/toolkit';
import { Reviews } from '../../types/types';
import { setReviewLoadingStatus, setReviews } from '../action';

type ReviewStateType = {
    isReviewLoading: boolean;
    reviews: Reviews;
  }

const initialReviewState: ReviewStateType = {
  isReviewLoading: false,
  reviews: [],
};

export const reviewReducer = createReducer(initialReviewState,(builder) => {
  builder
    .addCase(setReviewLoadingStatus, (state, action) => {
      state.isReviewLoading = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});
