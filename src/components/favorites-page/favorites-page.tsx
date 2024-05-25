import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navigate } from 'react-router-dom';
import { InternalRoute, LoadingMessage } from '../../const/const';
import { OfferCardData } from '../../types/types';
import { saveSelectedCity } from '../../utils/city-storage';
import MemoizedFavoriteList from './favorite-list';
import HeaderComponent from '../header-component/header-component';
import ErrorMessage from '../error-message/error-message';

function FavoritesPage(): JSX.Element {
  const isLoading = useSelector((state: RootState) => state.status.isLoading);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  const favoriteOfferList = useSelector((state: RootState) => state.favorite.favoriteOfferList);

  if (isLoading) {
    return <span>{LoadingMessage.Favorites}</span>;
  }

  if (!authorizationStatus) {
    return <Navigate to={InternalRoute.Login} />;
  }


  const groupedFavorites = favoriteOfferList.reduce<Record<string, OfferCardData[]>>((cities, favorite) => {
    const city = favorite.city.name;
    if (!cities[city]) {
      cities[city] = [];
    }
    cities[city].push(favorite);
    return cities;
  }, {});


  return (
    <div className="page">
      <ErrorMessage />
      <header className="header">
        <div className="container">
          <HeaderComponent/>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {(favoriteOfferList.length === 0) ?
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
            :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(groupedFavorites).map((cityName) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href={InternalRoute.Main} onClick={()=>saveSelectedCity(cityName)}>
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <MemoizedFavoriteList favorites={groupedFavorites[cityName]} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>}
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
