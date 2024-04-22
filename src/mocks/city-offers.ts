import { OffersByCity } from '../types/types';
import OFFERS from './offers';


const cityOffers: OffersByCity = {
  ['Paris']:[],
  ['Cologne']:[],
  ['Brussels']:[],
  ['Amsterdam']:OFFERS,
  ['Hamburg']:[],
  ['Dusseldorf']:[],
};
export default cityOffers;
