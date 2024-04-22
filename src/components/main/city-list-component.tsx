import { useDispatch } from 'react-redux';
import { updateCity, updateOfferList } from '../../store/action';

type CityListProps = {
  cityList: string[];
};

function CityListComponent({ cityList }: CityListProps): JSX.Element {
  const dispatch = useDispatch();

  const handleCityClick = (city: string) => {
    dispatch(updateCity(city));
    dispatch(updateOfferList(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cityList.map((city) => (
        <li key={city} className="locations__item">
          <a
            className="locations__item-link tabs__item"
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
