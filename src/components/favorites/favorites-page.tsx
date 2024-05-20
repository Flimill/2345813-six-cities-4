import { useSelector } from 'react-redux';
import FavoriteList from './favorite-list';
import { RootState } from '../../store';
import { OfferCardData } from '../../types/types';

function FavoritesPage(): JSX.Element {
  const favorites = useSelector((state: RootState) => state.offerList).filter((offer:OfferCardData)=>offer.isFavorite);
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {<FavoriteList favorites={favorites} />}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
export default FavoritesPage;
