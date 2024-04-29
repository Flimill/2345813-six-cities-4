import { cityPoints } from '../mocks/city-points';
import { City, OfferCardData } from '../types/types';

export function getOfferListByCity(city:string, offerList:OfferCardData[]): OfferCardData[] {
    let newOfferList:OfferCardData[] = offerList.filter((offer)=>offer.city.name==city)
    return newOfferList;
}

export function getPointByCity(city:string, offerList:OfferCardData[]): City {
    const cityPoint = offerList.find((offer) => offer.city.name === city)?.city;
    if (cityPoint) {
        return cityPoint
    } else {
        return cityPoints[city]
    }
}