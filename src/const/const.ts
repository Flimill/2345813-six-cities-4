
import { CityPoints, MapSize } from '../types/types';

export const URL_MARKER_DEFAULT = 'public/img/pin.svg';

export const URL_MARKER_CURRENT = 'public/img/pin-active.svg';

export const PLACES_OPTION_NAMES = ['Popular','Price: low to high','Price: high to low','Top rated first'];

export const CITY_LIST = ['Paris','Cologne','Brussels','Amsterdam','Hamburg','Dusseldorf'];

export const START_CITY = 'Paris';

export const START_SORTING_OPTION = 'Popular';


export const MAX_RATING = 5;

export const MAX_REVIEW_SIZE = 5;

export enum LoadingMessage{
  Neutral = 'Loading. Please wait.',
  Favorites = 'Uploading favorites. Please wait.',
  Offers = 'Uploading offers. Please wait.',
  Offer = 'Uploading offer. Please wait.',
  Reviews = 'Uploading reviews. Please wait.',
}

export enum InternalRoute{
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/',
  Error404Page = '/Error404Page',
}

export enum APIRoute {
  Offers = '/offers',
  Reviews = '/comments',
  Login = '/login',
  Favorite = '/favorite',
  Logout = '/logout',
}


export const CITY_POINTS: CityPoints = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 11
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.8465573,
      longitude: 4.351697,
      zoom: 12
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.374031,
      longitude: 4.88969,
      zoom: 12
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.22172,
      longitude: 6.77616,
      zoom: 13
    }
  }
};

export const MAIN_MAP_SIZE: MapSize = {
  height: '750px',
  width: '100%'
};

export const OFFER_MAP_SIZE: MapSize = {
  height: '100%',
  width: '100%'
};
