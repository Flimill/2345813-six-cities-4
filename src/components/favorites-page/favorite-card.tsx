import { useState } from 'react';
import { OfferCardData } from '../../types/types';
import { store } from '../../store';
import { updateFavoriteStatus } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { decrementFavoriteNumber, incrementFavoriteNumber } from '../../store/action';
import { InternalRoute, MAX_RATING } from '../../const/const';

type FavoriteCardProps = {
  favorite: OfferCardData;
};

function FavoriteCard({ favorite }: FavoriteCardProps): JSX.Element {
  const dispatch = useDispatch();
  const mark: JSX.Element = <div>{favorite.isPremium && <div className="place-card__mark" ><span>Premium</span></div>}</div>;
  const [isBookmarkActive, setIsBookmarkActive] = useState(favorite.isFavorite);
  const handleBookmark = () => {
    if (isBookmarkActive) {
      dispatch(decrementFavoriteNumber());
    } else {
      dispatch(incrementFavoriteNumber());
    }

    setIsBookmarkActive(!isBookmarkActive);

    store.dispatch(updateFavoriteStatus({ offerId: favorite.id, status: !isBookmarkActive ? 1 : 0 }));
  };

  const ratingWidth = `${(Math.round(favorite.rating) / MAX_RATING) * 100 }%`;
  const offerLink = `${InternalRoute.Offer}${favorite.id}`;
  return (

    <article className="favorites__card place-card">
      {mark}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href={offerLink}>
          <img className="place-card__image" src={favorite.previewImage} width="150" height="110" alt={favorite.title}/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favorite.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${(isBookmarkActive) ? 'place-card__bookmark-button--active' : ''} button`} type="button" onClick={handleBookmark}>
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
          <a href={offerLink}>{favorite.title}</a>
        </h2>
        <p className="place-card__type">{favorite.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
