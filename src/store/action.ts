import {createAction} from '@reduxjs/toolkit';

export const updateCity = createAction('createAction', (name:string) => ({
  payload: name,
}));
export const updateOfferList = createAction('updateOfferList', (nameCity:string) => ({
  payload: nameCity,
}));
