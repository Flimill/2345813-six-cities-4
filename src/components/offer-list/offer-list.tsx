import { OfferCardData } from '../../types/types';
import OfferCard from './offer-card';
import {MouseEvent} from 'react';

type OfferListProps = {
  offersCount: number;
  offers: OfferCardData[];
  onListItemHover: (listItemName: string) => void;
};

function OfferList({ offersCount, offers,onListItemHover }: OfferListProps): JSX.Element {
  const offerComponents: JSX.Element[] = [];

  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    const placeCardElement = event.currentTarget;
    const placeCardNameElement = placeCardElement.querySelector('.place-card__info .place-card__name a');
    if (placeCardNameElement !== null) {
      const placeCardName = placeCardNameElement.textContent;
      if (placeCardName !== null) {
        onListItemHover(placeCardName);
      }
    }
  };
  for (let i = 0; i < offersCount && i < offers.length; i++) {
    offerComponents.push(<OfferCard key={i} offer={offers[i]} handleListItemHover={handleListItemHover}/>);
  }
  //eslint-disable-next-line
  return <>{offerComponents}</>;
}

export default OfferList;
