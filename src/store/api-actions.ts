import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from './';
import { AxiosInstance } from 'axios';
import { loadOffers, setAuthorizationStatus, setError, setFavoriteNumber, setFavoriteOfferList, setFavoritesLoading, setLoadingStatus, setReviewLoadingStatus, setReviews, setSelectedOffer, setUserData } from './action';
import { FullOfferCardData, LoginData, OfferCardData, ReviewData, Reviews, updateFavoriteData, UserData } from '../types/types';
import { APIRoute } from '../const/const';

import { store } from './';
import { dropToken, saveToken } from '../services/token';

interface CustomErrorResponse {
  response: {
    data: {
      errorType: string;
    };
    status:number;
  };
}

/* eslint-disable */
function isCustomError(error: any): error is CustomErrorResponse {
  return error.response.data.errorType;
}

const handleError = (dispatch: AppDispatch, error: any) => {
  if (isCustomError(error)) {
    const errorType = error.response.data.errorType;
    dispatch(setError(errorType));
    if (error.response.status === 401) {
      dispatch(setAuthorizationStatus(false));
    }
  } else {
    dispatch(setError('SERVER_UNAVAILABLE'));
  }
};
/* eslint-enable */


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchAll',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<OfferCardData[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setLoadingStatus(false));
    } catch (err) {
      handleError(dispatch,err);
      dispatch(setLoadingStatus(false));
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchNearby',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<OfferCardData[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setLoadingStatus(false));
      dispatch(loadOffers(data));
    } catch (err) {
      handleError(dispatch,err);
      dispatch(setLoadingStatus(false));
    }
  }
);

export const fetchSelectedOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/fetchSelected',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<FullOfferCardData>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setLoadingStatus(false));
      dispatch(setSelectedOffer(data));
    } catch (err) {
      handleError(dispatch,err);
      dispatch(setLoadingStatus(false));
    }
  }
);

export const fetchReviewsList = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'reviews/fetchAll',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setReviewLoadingStatus(true));
      const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(setReviewLoadingStatus(false));
      dispatch(setReviews(data));
    } catch (err) {
      handleError(dispatch,err);
      dispatch(setReviewLoadingStatus(false));
    }
  }
);

export const sendReviewData = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'reviews/send',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setReviewLoadingStatus(true));
      await api.post(`${APIRoute.Reviews}/${offerId}`, { comment, rating });
      store.dispatch(fetchReviewsList(offerId));
      dispatch(setError(''));
    } catch (err) {
      handleError(dispatch,err);
    } finally {
      dispatch(setReviewLoadingStatus(false));
    }
  }
);

export const fetchFavoriteOfferList = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorites/fetchAll',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setFavoritesLoading(true));
      const { data } = await api.get<OfferCardData[]>(APIRoute.Favorite);
      dispatch(setFavoriteOfferList(data));
      dispatch(setFavoriteNumber(data.length));
    } catch (err) {
      handleError(dispatch,err);
    } finally {
      dispatch(setFavoritesLoading(false));
    }
  }
);

export const updateFavoriteStatus = createAsyncThunk<void, updateFavoriteData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorites/updateStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      await api.post<OfferCardData[]>(`${APIRoute.Favorite}/${offerId}/${status}`);
      store.dispatch(fetchFavoriteOfferList());
    } catch (err) {
      handleError(dispatch,err);
    }
  }
);

export const sendLoginData = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      dispatch(setAuthorizationStatus(true));
      saveToken(data.token);
      dispatch(setUserData(data));
    } catch (err) {
      handleError(dispatch,err);
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingStatus(true));
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      dispatch(setLoadingStatus(false));
    } catch (err) {
      dispatch(setAuthorizationStatus(false));
      dispatch(setLoadingStatus(false));
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setAuthorizationStatus(false));
    } catch (err) {
      handleError(dispatch,err);
    }
  }
);
