import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OfferCardData } from '../../types/types';
import { getSortedList } from '../../utils/offers-util';
import OfferCard from './offer-card';
import React from 'react';
import { LoadingMessage } from '../../const/const';

type OfferListComponentProps = {
  offers: OfferCardData[];
  sortingOption:string |null;
  isMapOn: boolean;
};

function OfferListComponent({ sortingOption, offers, isMapOn }: OfferListComponentProps): JSX.Element {
  const isLoading = useSelector((state: RootState) => (state.status.isLoading));
  const authorizationStatus = useSelector((state: RootState) => (state.user.authorizationStatus));

  if (isLoading) {
    return <span className="uploading">{LoadingMessage.Offers}</span>;
  } else {
    let sortedOffers = offers;
    if(sortingOption){
      sortedOffers = getSortedList(offers, sortingOption);
    }
    return (
      <>
        {(sortedOffers).map((offer) => (
          <OfferCard key={offer.id} offer={offer} isAuth={authorizationStatus} isMapOn={isMapOn}/>
        ))}
      </>
    );
  }
}

const MemoizedOfferListComponent = React.memo(OfferListComponent);

export default MemoizedOfferListComponent;
