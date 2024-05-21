import { START_CITY } from '../const/const';

const SELECTED_CITY_KEY_NAME = 'selected-city';

export type City = string;

export const getSelectedCity = (): City => {
  const city = localStorage.getItem(SELECTED_CITY_KEY_NAME);
  return city ?? START_CITY;
};

export const saveSelectedCity = (city: City): void => {
  localStorage.setItem(SELECTED_CITY_KEY_NAME, city);
};

export const dropSelectedCity = (): void => {
  localStorage.removeItem(SELECTED_CITY_KEY_NAME);
};
