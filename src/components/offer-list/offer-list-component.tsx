import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OfferCardData } from '../../types/types';
import { getSortedList } from '../../utils/offers-util';
import OfferCard from './offer-card';

type OfferListComponentProps = {
  offers: OfferCardData[];
};

function OfferListComponent({ offers }: OfferListComponentProps): JSX.Element {
  const { isLoading, sortingOption } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    sortingOption: state.sortingOption,
  }));

  if (isLoading) {
    return <span className="uploading">Uploading offers. Please wait.</span>;
  } else {
    const sortedOffers = getSortedList(offers, sortingOption);
    return (
      <>
        {sortedOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </>
    );
  }
}

export default OfferListComponent;
