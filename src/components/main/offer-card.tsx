import { OfferCardData } from '../../types/types';
import {MouseEvent, useState} from 'react';

type OfferCardProps = {
  offer: OfferCardData;
  handleListItemHover: (event: MouseEvent<HTMLLIElement>) => void;
};

function OfferCard({ offer,handleListItemHover }: OfferCardProps): JSX.Element {
  let mark: JSX.Element | null = null;
  if (offer.mark) {
    mark = <div className="place-card__mark"><span>Premium</span></div>;
  }
  const [isBookmarkActive, setIsBookmarkActive] = useState(true);

  const toggleBookmark = () => {
    setIsBookmarkActive((prevState) => !prevState);
  };
  const ratingWidth = `${(offer.rating / 5) * 100 }%`;
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="cities__card place-card" onMouseEnter={handleListItemHover}>
      {mark}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href={offerLink}>
          <img className="place-card__image" src={offer.imageUrl} width="260" height="200" alt={offer.name} />
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
          <a href={offerLink}>{offer.name}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
