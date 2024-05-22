const SOURCE_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map';

export const URL_MARKER_DEFAULT =
  `${SOURCE_URL}/pin.svg`;

export const URL_MARKER_CURRENT =
`${SOURCE_URL}/main-pin.svg`;

export const START_CITY = 'Amsterdam';

export const START_SORTING_OPTION = 'Popular';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum InternalRoutes{
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/',
  Error404Page = '/Error404Page',
}

export enum APIRoutes {
  Offers = '/offers',
  Reviews = '/comments',
  Login = '/login',
  Favorite = '/favorite',
  Logout = '/logout',
}
