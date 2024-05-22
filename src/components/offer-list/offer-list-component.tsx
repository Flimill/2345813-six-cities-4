import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OfferCardData } from '../../types/types';
import { getSortedList } from '../../utils/offers-util';
import OfferCard from './offer-card';

type OfferListComponentProps = {
  offers: OfferCardData[];
};

function OfferListComponent({ offers }: OfferListComponentProps): JSX.Element {
  const isLoading = useSelector((state: RootState) => (state.isLoading));
  const sortingOption = useSelector((state: RootState) => (state.sortingOption));
  const authorizationStatus = useSelector((state: RootState) => (state.authorizationStatus));

  if (isLoading) {
    return <span className="uploading">Uploading offers. Please wait.</span>;
  } else {
    const sortedOffers = getSortedList(offers, sortingOption);
    return (
      <>
        {sortedOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} isAuth={authorizationStatus}/>
        ))}
      </>
    );
  }
}

export default OfferListComponent;
