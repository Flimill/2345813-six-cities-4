import { useEffect, useState } from 'react';
import { OfferCardData } from '../../types/types';

type SortingOptionsProps = {
  offerList: OfferCardData[];
  onSort: (sortedList: OfferCardData[]) => void;
}

const placesOptionName = ['Popular','Price: low to high','Price: high to low','Top rated first'];

function getSortedList(offerList: OfferCardData[], selectedItem: string){
  const sortedItems: OfferCardData[] = [...offerList];
   if(selectedItem === 'Price: low to high'){
    sortedItems.sort((a, b) => a.price - b.price);
  } else if(selectedItem === 'Price: high to low'){
    sortedItems.sort((a, b) => b.price - a.price);
  } else if(selectedItem === 'Top rated first'){
    sortedItems.sort((a, b) => b.rating - a.rating);
  } //else (selectedItem === 'Popular')
  return sortedItems;
}

function SortingOptions({offerList, onSort}:SortingOptionsProps): JSX.Element{
  const [selectedItem, setSelectedItem] = useState('Popular');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sortedItems = getSortedList(offerList, selectedItem);
    onSort(sortedItems);
  }, [selectedItem, offerList]);

  const handleItemSelect = (item:string) => {
    setSelectedItem(item);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return(
    <form className="places__sorting" action="#" method="get" onClick={toggleOpen}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedItem}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : 'places__options--closed'}`}>
        {placesOptionName.map((item)=>(
          <li className={`places__option${(item === selectedItem) ? ' places__option--active' : ''}`} key={item} tabIndex={0} onClick={() => handleItemSelect(item)}>{item}</li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
