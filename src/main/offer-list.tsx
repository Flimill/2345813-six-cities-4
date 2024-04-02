import { OfferCardData } from '../mocks/offers';
import OfferCard from './offer-card';

type OfferListProps = {
  offersCount: number;
  offers: OfferCardData[];
};

function OfferList({ offersCount, offers }: OfferListProps): JSX.Element {
  const offerComponents: JSX.Element[] = [];

  for (let i = 0; i < offersCount && i < offers.length; i++) {
    offerComponents.push(<OfferCard key={i} offer={offers[i]} />);
  }
  return <>{offerComponents}</>; 
}

export default OfferList;
