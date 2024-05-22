import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortingOption } from '../../store/action';
import { RootState } from '../../store';

const placesOptionName = ['Popular','Price: low to high','Price: high to low','Top rated first'];


function SortingOptions(): JSX.Element{
  const dispatch = useDispatch();

  const selectedOption = useSelector((state: RootState) => state.mainPage.sortingOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option:string) => {
    dispatch(changeSortingOption(option));
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return(
    <form className="places__sorting" action="#" method="get" onClick={toggleOpen}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : 'places__options--closed'}`}>
        {placesOptionName.map((item)=>(
          <li className={`places__option${(item === selectedOption) ? ' places__option--active' : ''}`} key={item} tabIndex={0} onClick={() => handleOptionSelect(item)}>{item}</li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
