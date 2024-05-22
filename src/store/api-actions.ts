import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState,AppDispatch } from './';
import { AxiosInstance } from 'axios';
import { loadOffers, setAuthorizationStatus, setError, setFavoriteOfferList, setLoadingStatus, setReviewLoadingStatus, setReviews, setSelectedOffer, setUserData } from './action';
import { FullOfferCardData, LoginData, OfferCardData, ReviewData, Reviews, updateFavoriteData, UserData } from '../types/types';
import { APIRoutes, TIMEOUT_SHOW_ERROR } from '../const/const';

import {store} from './';
import { dropToken, saveToken } from '../services/token';

export const clearErrorAction = createAsyncThunk(
  'CLEAR_ERROR_ACTION',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

interface CustomErrorResponse {
  response: {
    data: {
      errorType: string;
    };
  };
}


/* eslint-disable */
function isCustomError(error: any): error is CustomErrorResponse {
  return error.response.data.errorType;
}
/* eslint-enable */
export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_OFFERS_ACTION',
    async (_arg, {dispatch, extra: api}) => {
      try{
        dispatch(setLoadingStatus(true));
        const {data} = await api.get<OfferCardData[]>(APIRoutes.Offers);
        dispatch(setLoadingStatus(false));
        dispatch(loadOffers(data));
      } catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }
        dispatch(setLoadingStatus(false));
      }
    }
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_NEARBY_OFFERS_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      try{
        dispatch(setLoadingStatus(true));
        const { data } = await api.get<OfferCardData[]>(`${APIRoutes.Offers}/${offerId}/nearby`);
        dispatch(setLoadingStatus(false));
        dispatch(loadOffers(data));
      } catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }
        dispatch(setLoadingStatus(false));
      }
    }
  );

export const fetchSelectedOffer = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_SELECTED_OFFER_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      try{
        dispatch(setLoadingStatus(true));
        const { data } = await api.get<FullOfferCardData>(`${APIRoutes.Offers}/${offerId}`);
        dispatch(setLoadingStatus(false));
        dispatch(setSelectedOffer(data));
      } catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }
        dispatch(setLoadingStatus(false));
      }
    }
  );

export const fetchReviewsList = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'FETCH_REVIEWS_LIST_ACTION',
    async (offerId, { dispatch, extra: api }) => {
      try{
        dispatch(setReviewLoadingStatus(true));
        const { data } = await api.get<Reviews>(`${APIRoutes.Reviews}/${offerId}`);
        dispatch(setReviewLoadingStatus(false));
        dispatch(setReviews(data));
      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }
        dispatch(setReviewLoadingStatus(false));
      }
    }
  );

export const sendReviewData = createAsyncThunk<void, ReviewData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'SEND_REVIEW_DATA',
    async ({offerId, comment,rating}, { dispatch, extra: api }) => {
      try{
        dispatch(setReviewLoadingStatus(true));
        await api.post(`${APIRoutes.Reviews}/${offerId}`,{comment,rating});
        store.dispatch(fetchReviewsList(offerId));


      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }

      }finally{
        dispatch(setReviewLoadingStatus(false));
      }
    }
  );

export const fetchFavoriteOfferList = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'GET_FAVORITE_OFFER_LIST',
    async (_arg, { dispatch, extra: api }) => {
      try{
        const { data } = await api.get<OfferCardData[]>(APIRoutes.Favorite);
        dispatch(setFavoriteOfferList(data));
      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }

      }
    }
  );

export const updateFavoriteStatus = createAsyncThunk<void, updateFavoriteData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'UPDATE_FAVORITE_STATUS',
    async ({offerId,status}, {dispatch, extra: api }) => {
      try{
        await api.post<OfferCardData[]>(`${APIRoutes.Favorite}/${offerId}/${status}`);
      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }

      }
    }
  );

export const sendLoginData = createAsyncThunk<void, LoginData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }>(
    'SEND_LOGIN_DATA',
    async ({email,password}, { dispatch, extra: api }) => {
      try{
        dispatch(setLoadingStatus(true));
        const { data } = await api.post<UserData>(APIRoutes.Login,{email,password});
        dispatch(setAuthorizationStatus(true));
        saveToken(data.token);
        dispatch(setUserData(data));
        dispatch(setLoadingStatus(false));
      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }

        dispatch(setLoadingStatus(false));
      }
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
      } catch(err) {
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
      try{
        await api.delete(APIRoutes.Logout);
        dropToken();
        dispatch(setAuthorizationStatus(false));
      }catch(err){
        if (isCustomError(err)) {
          const errorType = err.response.data.errorType;
          dispatch(setError(errorType));
        }
      }
    },
  );

