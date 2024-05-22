import { useDispatch } from 'react-redux';
import { OfferCardData } from '../../types/types';
import { useEffect, useState } from 'react';
import { changeSelectedPoint } from '../../store/action';
import { store } from '../../store';
import { fetchFavoriteOfferList, updateFavoriteStatus } from '../../store/api-actions';
import { Navigate } from 'react-router-dom';
import { InternalRoutes } from '../../const/const';

type OfferCardProps = {
  offer: OfferCardData;
  isAuth: boolean;
};

function OfferCard({ isAuth,offer }: OfferCardProps): JSX.Element {
  const dispatch = useDispatch();
  const mark: JSX.Element = <div>{offer.isPremium && <div className="place-card__mark" ><span>Premium</span></div>}</div>;

  const [isBookmarkActive, setIsBookmarkActive] = useState(offer.isFavorite);

  const point = {
    location: offer.location,
    name: offer.title
  };

  useEffect(() => {
    if(isAuth){
      store.dispatch(fetchFavoriteOfferList());
    }
  }, [isBookmarkActive,isAuth]);
  const toggleBookmark = () => {
    setIsBookmarkActive(!isBookmarkActive);
    if(isAuth){
      store.dispatch(updateFavoriteStatus({ offerId: offer.id, status: !isBookmarkActive ? 1 : 0 }));
    } else{
      return <Navigate to={InternalRoutes.Login} />;
    }
  };

  const ratingWidth = `${(Math.round(offer.rating) / 5) * 100 }%`;
  const offerLink = `/offer/${offer.id}`;

  return (
    <article className="cities__card place-card" onMouseEnter={() => dispatch(changeSelectedPoint(point))}>
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
            onClick={toggleBookmark}
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
