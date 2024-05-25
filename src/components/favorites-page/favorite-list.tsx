import React from 'react';
import { OfferCardData } from '../../types/types';
import FavoriteCard from './favorite-card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LoadingMessage } from '../../const/const';

type FavoriteListProps = {
    favorites: OfferCardData[];
};

function FavoriteList({ favorites }: FavoriteListProps): JSX.Element {
  const isFavoritesLoading = useSelector((state: RootState) => state.favorite.isFavoritesLoading);
  if (isFavoritesLoading) {
    return <span>{LoadingMessage.Offers}</span>;
  }
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
