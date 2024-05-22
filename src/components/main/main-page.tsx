import { useEffect } from 'react';
import { MapSize, OfferCardData} from '../../types/types';
import Map from '../map/map';
import MemoizedCityListComponent from './city-list-component';
import cityList from '../../const/city-list';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import SortingOptions from './sorting-options';
import {getOfferListByCity, getPointByCity } from '../../utils/offers-util';
import { changeSelectedPoint } from '../../store/action';
import { fetchOffersAction } from '../../store/api-actions';
import HeaderComponent from '../header/header-component';
import MemoizedOfferListComponent from '../offer-list/offer-list-component';


const mapSize: MapSize = {
  height: '750px',
  width: '100%'
};

function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  const city:string = useSelector((state: RootState) => state.mainPage.city);
  const offers: OfferCardData[] = getOfferListByCity(city, useSelector((state: RootState) => state.offer.offerList));
  const points = offers.map((offer) => offer.location);

  useEffect(() => {
    store.dispatch(fetchOffersAction());
    dispatch(changeSelectedPoint(undefined));
  }, [city,dispatch]);


  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <HeaderComponent/>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {<MemoizedCityListComponent cityList={cityList}/>}
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} place{offers.length === 1 ? '' : 's'} to stay in {city}</b>
              {<SortingOptions/>}
              <div className="cities__places-list places__list tabs__content">
                {<MemoizedOfferListComponent offers={offers} sortingOption = {null}/>}
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
