import { OfferCardData } from '../../types/types';
import OfferCard from './offer-card';
import {MouseEvent} from 'react';

type OfferListComponentProps = {
  offersCount: number;
  offers: OfferCardData[];
  onListItemHover: (listItemName: string) => void;
};

function OfferListComponent({ offersCount, offers,onListItemHover }: OfferListComponentProps): JSX.Element {

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
  //eslint-disable-next-line
  return (
    <>
      {offers.slice(0, offersCount).map((offer) => (
        <OfferCard key={offer.id} offer={offer} handleListItemHover={handleListItemHover} />
      ))}
    </>
  );
}

export default OfferListComponent;
