import { useEffect } from 'react';
import { OfferCardData} from '../../types/types';
import Map from '../map/map';
import MemoizedCityListComponent from './city-list-component';
import {CITY_LIST, MAIN_MAP_SIZE} from '../../const/const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import SortingOptions from './sorting-options';
import {getOfferListByCity, getPointByCity } from '../../utils/offers-util';
import { changeSelectedPoint } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import HeaderComponent from '../header-component/header-component';
import MemoizedOfferListComponent from '../offer-list/offer-list-component';
import { LoadingMessage } from '../../const/const';
import ErrorMessage from '../error-message/error-message';


function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  const city:string = useSelector((state: RootState) => state.mainPage.city);
  const sortingOption = useSelector((state: RootState) => state.mainPage.sortingOption);
  const isLoading = useSelector((state: RootState) => state.status.isLoading);
  const offers: OfferCardData[] = getOfferListByCity(city, useSelector((state: RootState) => state.offer.offerList));
  const points = offers.map((offer) => offer.location);


  useEffect(() => {
    store.dispatch(fetchOffersAction());
  }, []);

  useEffect(() => {
    dispatch(changeSelectedPoint(undefined));
  }, [city, dispatch]);

  if (isLoading) {
    return <span>{LoadingMessage.Neutral}</span>;
  }
  return (
    <div className="page page--gray page--main">
      <ErrorMessage />
      <header className="header">
        <div className="container">
          <HeaderComponent/>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {<MemoizedCityListComponent cityList={CITY_LIST}/>}
          </section>
        </div>
        <div className="cities">
          {(offers.length === 0) ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} place{offers.length === 1 ? '' : 's'} to stay in {city}</b>
                {<SortingOptions/>}
                <div className="cities__places-list places__list tabs__content">
                  {<MemoizedOfferListComponent offers={offers} sortingOption = {sortingOption} isMapOn/>}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">{<Map city={getPointByCity(city, offers)} points={points} mapSize={MAIN_MAP_SIZE}/>}</section>
              </div>
            </div>}

        </div>
      </main>
    </div>
  );
}

export default MainPage;
