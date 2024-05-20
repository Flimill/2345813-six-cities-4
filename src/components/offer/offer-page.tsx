import ReviewSection from './review-section';
import Map from '../map/map';
import { MapSize} from '../../types/types';
import OfferListComponent from '../offer-list/offer-list-component';

import { useParams } from 'react-router-dom';
import { cityPoints } from '../../mocks/city-points';
import { RootState, store } from '../../store';
import { fetchNearbyOffersAction, fetchReviewsList, fetchSelectedOffer } from '../../store/api-actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { START_CITY } from '../../const';
import ImageList from './image-list';

const mapSize: MapSize = {
  height: '100%',
  width: '100%'
};

function OfferPage(): JSX.Element {
  const { id } = useParams();

  const { isLoading, offers, selectedOffer } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    offers: state.offerList,
    selectedOffer: state.selectedOffer
  }));

  useEffect(() => {
    if (id) {
      store.dispatch(fetchSelectedOffer(id));
      store.dispatch(fetchNearbyOffersAction(id));
      store.dispatch(fetchReviewsList(id));
    }
  }, [id]);
  let offersCity:string = START_CITY;
  if (selectedOffer) {
    offersCity = selectedOffer.city.name;
  }


  const points = offers.map((offer) => (offer.location));

  if (isLoading || !selectedOffer) {
    return <span>Uploading offer. Please wait.</span>;
  }
  const ratingWidth = `${(Math.round(selectedOffer.rating) / 5) * 100 }%`;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <ImageList images={selectedOffer.images}/>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>{(selectedOffer.isPremium) ? 'Premium' : ''}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {selectedOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
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
              {<ReviewSection/>}
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
              {<OfferListComponent offers={offers}/>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
