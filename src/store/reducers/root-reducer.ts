import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user-reducer';
import { mapReducer } from './map-reducer';
import { offerReducer } from './offer-reducer';
import { reviewReducer } from './review-reducer';
import { statusReducer } from './status-reducer';
import { mainPageReducer } from './main-page-reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  mainPage: mainPageReducer,
  offer: offerReducer,
  review: reviewReducer,
  status: statusReducer,
});
