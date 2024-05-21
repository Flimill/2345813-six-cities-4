import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState,AppDispatch } from './';
import { AxiosInstance } from 'axios';
import { loadOffers, setAuthorizationStatus, setError, setFavoriteOfferList, setLoadingStatus, setReviews, setSelectedOffer, setUserData } from './action';
import { FullOfferCardData, LoginData, OfferCardData, Reviews, updateFavoriteData, UserData } from '../types/types';
import { APIRoutes, TIMEOUT_SHOW_ERROR } from '../const/const';

import {store} from './';
import { dropToken, saveToken } from '../services/token';

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
      const {data} = await api.get<OfferCardData[]>(APIRoutes.Offers);
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
      const { data } = await api.get<OfferCardData[]>(`${APIRoutes.Offers}/${offerId}/nearby`);
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
      const { data } = await api.get<FullOfferCardData>(`${APIRoutes.Offers}/${offerId}`);
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
      const { data } = await api.get<Reviews>(`${APIRoutes.Reviews}/${offerId}`);
      dispatch(setLoadingStatus(false));
      dispatch(setReviews(data));
    }
  );

export const fetchFavoriteOfferList = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'GET_FAVORITE_OFFER_LIST',
    async (_arg, { dispatch, extra: api }) => {
      const { data } = await api.get<OfferCardData[]>(APIRoutes.Favorite);
      dispatch(setFavoriteOfferList(data));
    }
  );

export const updateFavoriteStatus = createAsyncThunk<void, updateFavoriteData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'UPDATE_FAVORITE_STATUS',
    async ({offerId,status}, { extra: api }) => {
      await api.post<OfferCardData[]>(`${APIRoutes.Favorite}/${offerId}/${status}`);
    }
  );

export const sendLoginData = createAsyncThunk<void, LoginData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'SEND_LOGIN_DATA',
    async ({email,password}, { dispatch, extra: api }) => {
      dispatch(setLoadingStatus(true));
      const { data } = await api.post<UserData>(APIRoutes.Login,{email,password});
      dispatch(setAuthorizationStatus(true));
      saveToken(data.token);
      dispatch(setUserData(data));
      dispatch(setLoadingStatus(false));

    }
  );

export const checkAuth = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'CHECK_AUTH',
    async (_arg, {dispatch, extra: api}) => {
      try {
        dispatch(setLoadingStatus(true));
        const {data} = await api.get<UserData>(APIRoutes.Login);
        dispatch(setAuthorizationStatus(true));
        dispatch(setUserData(data));
        dispatch(setLoadingStatus(false));
      } catch {
        dispatch(setAuthorizationStatus(false));
        dispatch(setLoadingStatus(false));
      }
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'LOGOUT_ACTION',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoutes.Logout);
      dropToken();
      dispatch(setAuthorizationStatus(false));
    },
  );

