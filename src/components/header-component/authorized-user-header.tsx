import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { fetchFavoriteOfferList, logoutAction } from '../../store/api-actions';
import { InternalRoute } from '../../const/const';
import { useEffect } from 'react';

function AuthorizedUserHeader(): JSX.Element {
  const userData = useSelector((state: RootState) => state.user.userData);
  const favoriteNumber = useSelector((state: RootState) => state.favorite.favoriteNumber);

  useEffect(() => {
    store.dispatch(fetchFavoriteOfferList());
  }, []);

  const handleClick = () => {
    store.dispatch(logoutAction());
  };
  return(
    <>
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href={InternalRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
          <span className="header__favorite-count">{favoriteNumber}</span>
        </a>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link">
          <span className="header__signout" onClick={handleClick}>Log Out</span>
        </a>
      </li>
    </>
  );
}

export default AuthorizedUserHeader;
