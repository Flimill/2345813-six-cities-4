import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/types';
import { setAuthorizationStatus, setUserData } from '../action';

type UserStateType = {
  authorizationStatus:boolean;
  userData: UserData|undefined;
}

const initialUserState: UserStateType = {
  authorizationStatus: false,
  userData: undefined
};

export const userReducer = createReducer(initialUserState,(builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
