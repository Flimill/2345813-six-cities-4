import { OfferCardData } from '../mocks/offers';
import FavoriteList from './favorite-list';

type FavoritesProps = {
  favoritesCount: number;
  favorites: OfferCardData[];
};


function FavoritesPage({ favoritesCount, favorites }: FavoritesProps): JSX.Element {
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
                 {<FavoriteList favoritesCount={favoritesCount} favorites={favorites} />}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
export default FavoritesPage;
