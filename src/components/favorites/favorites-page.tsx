import { useDispatch, useSelector } from 'react-redux';
import FavoriteList from './favorite-list';
import { RootState, store } from '../../store';
import { useEffect } from 'react';
import { fetchFavoriteOfferList } from '../../store/api-actions';
import { Navigate } from 'react-router-dom';
import { InternalRoutes } from '../../const/const';
import { OfferCardData } from '../../types/types';
import { saveSelectedCity } from '../../utils/city-storage';

function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch();
  const { isLoading, authorizationStatus, favoriteOfferList } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    authorizationStatus: state.authorizationStatus,
    favoriteOfferList: state.favoriteOfferList,
  }));

  useEffect(() => {
    store.dispatch(fetchFavoriteOfferList());
  }, [dispatch]);

  if (isLoading) {
    return <span>Uploading offer. Please wait.</span>;
  }

  if (!authorizationStatus) {
    return <Navigate to={InternalRoutes.Login} />;
  }

  interface GroupedFavorites {
    [city: string]: OfferCardData[];
  }

  const groupedFavorites = favoriteOfferList.reduce<GroupedFavorites>((acc, favorite) => {
    const city = favorite.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(favorite);
    return acc;
  }, {});


  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(groupedFavorites).map((cityName) => (
              <li key={cityName} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href={InternalRoutes.Main} onClick={()=>saveSelectedCity(cityName)}>
                      <span>{cityName}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoriteList favorites={groupedFavorites[cityName]} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
