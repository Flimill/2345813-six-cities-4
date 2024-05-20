import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState,AppDispatch } from './';
import { AxiosInstance } from 'axios';
import { loadOffers, setError, setLoadingStatus, setReviews, setSelectedOffer } from './action';
import { FullOfferCardData, OfferCardData, Reviews } from '../types/types';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';

import {store} from './';

export const clearErrorAction = createAsyncThunk(
  'CLEAR_ERROR_ACTION',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_OFFERS_ACTION',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setLoadingStatus(true));
      const {data} = await api.get<OfferCardData[]>(APIRoute.Offers);
      dispatch(setLoadingStatus(false));
      dispatch(loadOffers(data));
    }
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_NEARBY_OFFERS_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<OfferCardData[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setLoadingStatus(false));
      dispatch(loadOffers(data));

    }
  );

export const fetchSelectedOffer = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_SELECTED_OFFER_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<FullOfferCardData>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setLoadingStatus(false));
      dispatch(setSelectedOffer(data));

    }
  );

export const fetchReviewsList = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_REVIEWS_LIST_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(setLoadingStatus(false));
      dispatch(setReviews(data));
    }
  );

