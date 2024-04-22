import { OfferCardData } from '../../types/types';
import FavoriteCard from './favorite-card';

type FavoriteListProps = {
    favoritesCount: number;
    favorites: OfferCardData[];
};

function FavoriteList({ favoritesCount, favorites }: FavoriteListProps): JSX.Element {


  return (
    <>
      {favorites.slice(0, favoritesCount).map((favorite) => (
        <FavoriteCard key={favorite.id} favorite={favorite} />
      ))}
    </>
  );
}

export default FavoriteList;
