import { useDispatch, useSelector } from 'react-redux';
import { updateCity } from '../../store/action';
import { RootState } from '../../store';

type CityListProps = {
  cityList: string[];
};

function CityListComponent({ cityList }: CityListProps): JSX.Element {
  const selectedCity = useSelector((state: RootState) => state.city);

  const dispatch = useDispatch();

  const handleCityClick = (city: string) => {
    dispatch(updateCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cityList.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item${(city === selectedCity) ? ' tabs__item--active' : ''}`}
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

export default CityListComponent;
