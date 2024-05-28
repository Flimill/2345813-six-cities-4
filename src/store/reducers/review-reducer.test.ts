import { describe, it, expect } from 'vitest';
import { setReviewLoadingStatus, setReviews } from '../action';
import { reviewReducer } from './review-reducer';
import { Reviews } from '../../types/types';

describe('reviewReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      isReviewLoading: false,
      reviews: [],
    };
    expect(reviewReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setReviewLoadingStatus', () => {
    const initialState = {
      isReviewLoading: false,
      reviews: [],
    };
    const loadingStatus = true;
    const action = setReviewLoadingStatus(loadingStatus);
    const expectedState = {
      isReviewLoading: loadingStatus,
      reviews: [],
    };
    expect(reviewReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setReviews', () => {
    const initialState = {
      isReviewLoading: false,
      reviews: [],
    };
    const newReviews: Reviews = [
      { id: '1', date: '2024-05-27', user: { name: 'User 1', avatarUrl: '', isPro: false }, comment: 'Review 1', rating: 5 },
      { id: '2', date: '2024-05-28', user: { name: 'User 2', avatarUrl: '', isPro: false }, comment: 'Review 2', rating: 4 },
    ];
    const action = setReviews(newReviews);
    const expectedState = {
      isReviewLoading: false,
      reviews: newReviews,
    };
    expect(reviewReducer(initialState, action)).toEqual(expectedState);
  });
});
