import ReviewSection from './review-section';
import Map from '../map/map';
import { MapSize} from '../../types/types';
import { Navigate, useParams } from 'react-router-dom';
import { cityPoints } from '../../const/city-points';
import { RootState, store } from '../../store';
import {fetchNearbyOffersAction, fetchReviewsList, fetchSelectedOffer, updateFavoriteStatus } from '../../store/api-actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InternalRoutes, START_CITY } from '../../const/const';
import HeaderComponent from '../header/header-component';
import MemoizedOfferListComponent from '../offer-list/offer-list-component';
import MemoizedImageList from './image-list';

const mapSize: MapSize = {
  height: '100%',
  width: '100%'
};

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const { isLoading, offers, selectedOffer,error,sortingOption } = useSelector((state: RootState) => ({
    isLoading: state.status.isLoading,
    offers: state.offer.offerList,
    selectedOffer: state.offer.selectedOffer,
    error: state.status.error,
    sortingOption: state.mainPage.sortingOption
  }));


  useEffect(() => {
    if (id) {
      store.dispatch(fetchSelectedOffer(id));
      store.dispatch(fetchNearbyOffersAction(id));
      store.dispatch(fetchReviewsList(id));
    }
  }, [id]);
  if (error === 'COMMON_ERROR'){
    return <Navigate to={InternalRoutes.Error404Page}/>;
  }
  if (isLoading || !selectedOffer) {
    return <span>Uploading offer. Please wait.</span>;
  }

  let offersCity:string = START_CITY;
  if (selectedOffer) {
    offersCity = selectedOffer.city.name;
  }


  const points = offers.map((offer) => (offer.location));


  const ratingWidth = `${(Math.round(selectedOffer.rating) / 5) * 100 }%`;
  const premiumMark = <div className="offer__mark"><span>Premium</span></div>;

  const toggleBookmark = () => {
    store.dispatch(updateFavoriteStatus({offerId: selectedOffer.id , status: (!selectedOffer.isFavorite) ? 1 : 0}));
  };
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <HeaderComponent/>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <MemoizedImageList images={selectedOffer.images}/>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {(selectedOffer.isPremium) ? premiumMark : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {selectedOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${(selectedOffer.isFavorite) ? 'offer__bookmark-button--active' : ''}`}
                  type="button" onClick={toggleBookmark}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingWidth}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {selectedOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {(selectedOffer.bedrooms === 1) ? '1 Bedroom' : `${selectedOffer.bedrooms} Bedrooms`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {(selectedOffer.maxAdults === 1) ? 'Max 1 adult' : `Max ${selectedOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{selectedOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {selectedOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${(selectedOffer.host.isPro) ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper1`}>
                    <img className="offer__avatar user__avatar" src={selectedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {selectedOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {(selectedOffer.host.isPro) ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {selectedOffer.description}
                  </p>
                </div>
              </div>
              {<ReviewSection offerId={selectedOffer.id}/>}
            </div>
          </div>
          <section className="offer__map map">
            {<Map city={cityPoints[offersCity]} points={points} mapSize={mapSize}/>}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {<MemoizedOfferListComponent offers={offers} sortingOption={sortingOption}/>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
