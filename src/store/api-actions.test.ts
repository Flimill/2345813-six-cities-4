import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './index';
import { fetchOffersAction, fetchNearbyOffersAction, fetchSelectedOffer, fetchReviewsList, sendReviewData, fetchFavoriteOfferList, updateFavoriteStatus, sendLoginData, checkAuth, logoutAction } from './api-actions';
import { APIRoute } from '../const/const';
import { loadOffers, setAuthorizationStatus, setError, setFavoriteNumber, setFavoriteOfferList, setFavoritesLoading, setLoadingStatus, setReviewLoadingStatus, setReviews, setSelectedOffer, setUserData } from './action';
import { FullOfferCardData, LoginData, OfferCardData, ReviewData, Reviews, updateFavoriteData, UserData } from '../types/types';
import * as tokenStorage from '../services/token';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { extractActionsTypes } from './ut/mocks';

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('fetchOffersAction', () => {
    it('should dispatch loadOffers and setLoadingStatus when server responds with data', async () => {
      const mockOffers: OfferCardData[] = [];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());
      const actions: string[] = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        setLoadingStatus.type,
        loadOffers.type,
        setLoadingStatus.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch loadOffers and setLoadingStatus when server responds with data', async () => {
      const mockOffers: OfferCardData[] = [];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyOffersAction('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        setLoadingStatus.type,
        setLoadingStatus.type,
        loadOffers.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchSelectedOffer', () => {
    it('should dispatch setSelectedOffer and setLoadingStatus when server responds with data', async () => {
      const mockOffer: FullOfferCardData = {} as FullOfferCardData;
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/1`).reply(200, mockOffer);

      await store.dispatch(fetchSelectedOffer('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchSelectedOffer.pending.type,
        setLoadingStatus.type,
        setLoadingStatus.type,
        setSelectedOffer.type,
        fetchSelectedOffer.fulfilled.type,
      ]);
    });
  });

  describe('fetchReviewsList', () => {
    it('should dispatch setReviews and setReviewLoadingStatus when server responds with data', async () => {
      const mockReviews: Reviews = [];
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/1`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsList('1'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchReviewsList.pending.type,
        setReviewLoadingStatus.type,
        setReviewLoadingStatus.type,
        setReviews.type,
        fetchReviewsList.fulfilled.type,
      ]);
    });
  });

  describe('sendReviewData', () => {
    it('should dispatch fetchReviewsList and setError when server responds with data', async () => {
      const mockReviewData: ReviewData = { offerId: '1', comment: 'Nice place', rating: 5 };
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/1`).reply(200);

      await store.dispatch(sendReviewData(mockReviewData));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        sendReviewData.pending.type,
        setReviewLoadingStatus.type,
        setError.type,
        setReviewLoadingStatus.type,
        sendReviewData.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoriteOfferList', () => {
    it('should dispatch setFavoriteOfferList and setFavoriteNumber when server responds with data', async () => {
      const mockOffers: OfferCardData[] = [];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOfferList());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavoriteOfferList.pending.type,
        setFavoritesLoading.type,
        setFavoriteOfferList.type,
        setFavoriteNumber.type,
        setFavoritesLoading.type,
        fetchFavoriteOfferList.fulfilled.type,
      ]);
    });
  });

  describe('updateFavoriteStatus', () => {
    it('should dispatch fetchFavoriteOfferList when server responds with data', async () => {
      const mockFavoriteData: updateFavoriteData = { offerId: '1', status: 1 };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(200);

      await store.dispatch(updateFavoriteStatus(mockFavoriteData));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        updateFavoriteStatus.pending.type,
        updateFavoriteStatus.fulfilled.type,
      ]);
    });
  });

  describe('sendLoginData', () => {
    it('should dispatch setAuthorizationStatus, setUserData and saveToken when server responds with data', async () => {
      const mockLoginData: LoginData = { email: 'test@test.com', password: '123456' };
      const mockUserData: UserData = { email: 'test@test.com', token: 'secret', name: 'Test User', avatarUrl: '', isPro: false };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(sendLoginData(mockLoginData));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        sendLoginData.pending.type,
        setAuthorizationStatus.type,
        setUserData.type,
        sendLoginData.fulfilled.type,
      ]);
    });
    it('should dispatch setAuthorizationStatus, setUserData and saveToken when server responds with data', async () => {
      const mockLoginData: LoginData = { email: 'test@test.com', password: '123456' };
      const mockUserData: UserData = { email: 'test@test.com', token: 'secret', name: 'Test User', avatarUrl: '', isPro: false };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(sendLoginData(mockLoginData));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        sendLoginData.pending.type,
        setAuthorizationStatus.type,
        setUserData.type,
        sendLoginData.fulfilled.type,
      ]);

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockUserData.token);
    });
  });

  describe('checkAuth', () => {
    it('should dispatch setAuthorizationStatus, setUserData when server responds with data', async () => {
      const mockUserData: UserData = { email: 'test@test.com', token: 'secret', name: 'Test User', avatarUrl: '', isPro: false };
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuth.pending.type,
        setLoadingStatus.type,
        setAuthorizationStatus.type,
        setUserData.type,
        setLoadingStatus.type,
        checkAuth.fulfilled.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch setAuthorizationStatus and dropToken when server responds with data', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        logoutAction.pending.type,
        setAuthorizationStatus.type,
        logoutAction.fulfilled.type,
      ]);
    });
    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        setAuthorizationStatus.type,
        logoutAction.fulfilled.type,
      ]);

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
