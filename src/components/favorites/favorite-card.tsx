import { OfferCardData } from '../../mocks/offers';

type FavoriteCardProps = {
  favorite: OfferCardData;
};

function FavoriteCard({ favorite }: FavoriteCardProps): JSX.Element {
  let mark: JSX.Element | null = null;
  if (favorite.mark) {
    mark = <div className="place-card__mark"><span>Premium</span></div>;
  }
  const ratingWidth = `${(favorite.rating / 5) * 100 }%`;
  const offerLink = `/offer/${favorite.id}`;
  return (

    <article className="favorites__card place-card">
      {mark}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href={offerLink}>
          <img className="place-card__image" src={favorite.imageUrl} width="150" height="110" alt={favorite.name}/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favorite.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
          <a href={offerLink}>{favorite.name}</a>
        </h2>
        <p className="place-card__type">{favorite.type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
