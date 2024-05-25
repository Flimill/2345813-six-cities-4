import { useDispatch } from 'react-redux';
import { OfferCardData } from '../../types/types';
import { useState } from 'react';
import { changeSelectedPoint, decrementFavoriteNumber, incrementFavoriteNumber } from '../../store/action';
import { store } from '../../store';
import { updateFavoriteStatus } from '../../store/api-actions';
import { Navigate } from 'react-router-dom';
import { InternalRoute, MAX_RATING } from '../../const/const';

type OfferCardProps = {
  offer: OfferCardData;
  isAuth: boolean;
  isMapOn:boolean;
};

function OfferCard({ isAuth, offer,isMapOn }: OfferCardProps): JSX.Element {
  const dispatch = useDispatch();
  const mark: JSX.Element = <div>{offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}</div>;

  const [isBookmarkActive, setIsBookmarkActive] = useState(offer.isFavorite);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const point = {
    location: offer.location,
    name: offer.title,
  };

  const handleBookmark = () => {
    if (isAuth) {
      if (isBookmarkActive) {
        dispatch(decrementFavoriteNumber());
      } else {
        dispatch(incrementFavoriteNumber());
      }

      setIsBookmarkActive(!isBookmarkActive);

      store.dispatch(updateFavoriteStatus({ offerId: offer.id, status: !isBookmarkActive ? 1 : 0 }));
    } else {
      setRedirectToLogin(true);
    }
  };

  const ratingWidth = `${(Math.round(offer.rating) / MAX_RATING) * 100}%`;
  const offerLink = `${InternalRoute.Offer}${offer.id}`;

  if (redirectToLogin) {
    return <Navigate to={InternalRoute.Login} />;
  }
  function handleMouseEnter(){
    if(isMapOn){
      dispatch(changeSelectedPoint(point));
    }
  }

  return (
    <article className="cities__card place-card" onMouseEnter={handleMouseEnter}>
      {mark}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isBookmarkActive ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleBookmark}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={offerLink}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
