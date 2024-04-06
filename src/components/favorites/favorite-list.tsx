import { OfferCardData } from '../../mocks/offers';
import FavoriteCard from './favorite-card';

type FavoriteListProps = {
    favoritesCount: number;
    favorites: OfferCardData[];
};

function FavoriteList({ favoritesCount, favorites }: FavoriteListProps): JSX.Element {
  const offerComponents: JSX.Element[] = [];

  for (let i = 0; i < favoritesCount && i < favorites.length; i++) {
    offerComponents.push(<FavoriteCard key={i} favorite={favorites[i]} />);
  }
  //eslint-disable-next-line
  return <>{offerComponents}</>;
}

export default FavoriteList;
