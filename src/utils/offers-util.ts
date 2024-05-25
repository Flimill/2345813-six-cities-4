import { CITY_POINTS } from '../const/const';
import { City, OfferCardData } from '../types/types';

export function getOfferListByCity(city:string, offerList:OfferCardData[]): OfferCardData[] {
  return offerList.filter((offer)=>offer.city.name === city);
}

export function getPointByCity(city:string, offerList:OfferCardData[]): City {
  const cityPoint = offerList.find((offer) => offer.city.name === city)?.city;
  if (cityPoint) {
    return cityPoint;
  } else {
    return CITY_POINTS[city];
  }
}

export function getSortedList(offerList: OfferCardData[], selectedOption: string){
  const sortedItems: OfferCardData[] = [...offerList];
  if(selectedOption === 'Price: low to high'){
    sortedItems.sort((a, b) => a.price - b.price);
  } else if(selectedOption === 'Price: high to low'){
    sortedItems.sort((a, b) => b.price - a.price);
  } else if(selectedOption === 'Top rated first'){
    sortedItems.sort((a, b) => b.rating - a.rating);
  } //Popular
  return sortedItems;
}
