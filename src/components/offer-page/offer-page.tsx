import ReviewSection from './review-section';
import Map from '../map/map';
import { Navigate, useParams } from 'react-router-dom';
import { CITY_POINTS, LoadingMessage, MAX_NEAR_OFFERS, OFFER_MAP_SIZE } from '../../const/const';
import { RootState, store } from '../../store';
import { fetchNearbyOffersAction, fetchReviewsList, fetchSelectedOffer, updateFavoriteStatus } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InternalRoute, START_CITY } from '../../const/const';
import HeaderComponent from '../header-component/header-component';
import MemoizedOfferListComponent from '../offer-list/offer-list-component';
import MemoizedImageList from './image-list';
import { changeSelectedPoint, decrementFavoriteNumber, incrementFavoriteNumber } from '../../store/action';
import ErrorMessage from '../error-message/error-message';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.status.isLoading);
  const offers = useSelector((state: RootState) => state.offer.offerList);
  const selectedOffer = useSelector((state: RootState) => state.offer.selectedOffer);
  const error = useSelector((state: RootState) => state.status.error);
  const isAuth = useSelector((state: RootState) => (state.user.authorizationStatus));
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (id) {
      store.dispatch(fetchSelectedOffer(id));
      store.dispatch(fetchNearbyOffersAction(id));
      store.dispatch(fetchReviewsList(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedOffer) {
      setIsBookmarkActive(selectedOffer.isFavorite);
      dispatch(changeSelectedPoint({
        location: selectedOffer.location,
        name: selectedOffer.title,
      }));
    }
  }, [selectedOffer, dispatch]);

  if (error === 'COMMON_ERROR') {
    return <Navigate to={InternalRoute.Error404Page} />;
  }
  if (isLoading || !selectedOffer) {
    return <span>{LoadingMessage.Offer}</span>;
  }

  let offersCity: string = START_CITY;
  if (selectedOffer) {
    offersCity = selectedOffer.city.name;
  }

  const handleBookmark = () => {
    if (isAuth) {
      if (isBookmarkActive) {
        dispatch(decrementFavoriteNumber());
      } else {
        dispatch(incrementFavoriteNumber());
      }

      setIsBookmarkActive(!isBookmarkActive);
      store.dispatch(updateFavoriteStatus({ offerId: selectedOffer.id, status: !isBookmarkActive ? 1 : 0 }));
    } else {
      setRedirectToLogin(true);
    }
  };

  if (redirectToLogin) {
    return <Navigate to={InternalRoute.Login} />;
  }

  const nearOffers = offers.slice(0, MAX_NEAR_OFFERS);
  const points = [...nearOffers.map((offer) => offer.location), selectedOffer.location];
  const ratingWidth = `${(Math.round(selectedOffer.rating) / 5) * 100}%`;
  const premiumMark = <div className="offer__mark"><span>Premium</span></div>;

  return (
    <div className="page">
      <ErrorMessage />
      <header className="header">
        <div className="container">
          <HeaderComponent />
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <MemoizedImageList images={selectedOffer.images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {(selectedOffer.isPremium) ? premiumMark : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {selectedOffer.title}
                </h1>
                <button className={`offer__bookmark-button button ${(isBookmarkActive) ? 'offer__bookmark-button--active' : ''}`}
                  type="button" onClick={handleBookmark}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
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
              {<ReviewSection offerId={selectedOffer.id} />}
            </div>
          </div>
          <section className="offer__map map">
            {<Map city={CITY_POINTS[offersCity]} points={points} mapSize={OFFER_MAP_SIZE} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {<MemoizedOfferListComponent offers={nearOffers} sortingOption={null} isMapOn={false} />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
