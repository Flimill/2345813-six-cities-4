import { useDispatch, useSelector } from 'react-redux';
import { updateCity } from '../../store/action';
import { RootState } from '../../store';
import { getSelectedCity, saveSelectedCity } from '../../utils/city-storage';
import React, { useEffect } from 'react';

type CityListProps = {
  cityList: string[];
};

function CityListComponent({ cityList }: CityListProps): JSX.Element {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.mainPage.city);

  useEffect(() => {
    const storedCity = getSelectedCity();
    if (storedCity && storedCity !== selectedCity) {
      dispatch(updateCity(storedCity));
    }
  }, [dispatch, selectedCity]);

  const handleCityClick = (city: string) => {
    saveSelectedCity(city);
    dispatch(updateCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cityList.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item${city === selectedCity ? ' tabs__item--active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCityListComponent = React.memo(CityListComponent);

export default MemoizedCityListComponent;
