import { describe, it, expect } from 'vitest';
import { setAuthorizationStatus, setUserData } from '../action';
import { userReducer } from './user-reducer';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      authorizationStatus: false,
      userData: undefined,
    };
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAuthorizationStatus', () => {
    const initialState = {
      authorizationStatus: false,
      userData: undefined,
    };
    const newAuthorizationStatus = true;
    const action = setAuthorizationStatus(newAuthorizationStatus);
    const expectedState = {
      authorizationStatus: newAuthorizationStatus,
      userData: undefined,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setUserData', () => {
    const initialState = {
      authorizationStatus: false,
      userData: undefined,
    };
    const newUserData = { name: 'John Doe', avatarUrl: 'example.com/avatar.jpg', isPro: false, email: 'john@example.com', token: 'token123' };
    const action = setUserData(newUserData);
    const expectedState = {
      authorizationStatus: false,
      userData: newUserData,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
