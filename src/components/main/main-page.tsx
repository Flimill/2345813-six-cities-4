import { useEffect } from 'react';
import { MapSize, OfferCardData} from '../../types/types';
import Map from '../map/map';
import OfferListComponent from '../offer-list/offer-list-component';
import CityListComponent from './city-list-component';
import cityList from '../../mocks/city-list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import SortingOptions from './sorting-options';
import {getOfferListByCity, getPointByCity } from '../../utils/offers-util';
import { changeSelectedPoint } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';


const mapSize: MapSize = {
  height: '750px',
  width: '100%'
};

function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  const city:string = useSelector((state: RootState) => state.city);
  const offers: OfferCardData[] = getOfferListByCity(city, useSelector((state: RootState) => state.offerList));
  const points = offers.map((offer) => offer.location);

  useEffect(() => {
    store.dispatch(fetchOffersAction());
    dispatch(changeSelectedPoint(undefined));
  }, [city,dispatch]);


  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {<CityListComponent cityList={cityList}/>}
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} place{offers.length === 1 ? '' : 's'} to stay in {city}</b>
              {<SortingOptions/>}
              <div className="cities__places-list places__list tabs__content">
                {<OfferListComponent offers={offers}/>}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">{<Map city={getPointByCity(city, offers)} points={points} mapSize={mapSize}/>}</section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
