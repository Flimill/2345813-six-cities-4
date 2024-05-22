import React from 'react';
import { OfferCardData } from '../../types/types';
import FavoriteCard from './favorite-card';

type FavoriteListProps = {
    favorites: OfferCardData[];
};

function FavoriteList({ favorites }: FavoriteListProps): JSX.Element {
  return (
    <>
      {favorites.map((favorite) => (
        <FavoriteCard key={favorite.id} favorite={favorite} />
      ))}
    </>
  );
}


const MemoizedFavoriteList = React.memo(FavoriteList);

export default MemoizedFavoriteList;
