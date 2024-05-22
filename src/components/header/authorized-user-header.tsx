import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { InternalRoutes } from '../../const/const';

function AuthorizedUserHeader(): JSX.Element {
  const {userData, favoriteList} = useSelector((state: RootState) => ({
    userData: state.user.userData,
    favoriteList: state.offer.favoriteOfferList
  }));
  const onClick = () => {
    store.dispatch(logoutAction());
  };
  return(
    <>
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href={InternalRoutes.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
          <span className="header__favorite-count">{favoriteList.length}</span>
        </a>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#">
          <span className="header__signout" onClick={onClick}>Sign out</span>
        </a>
      </li>
    </>
  );
}

export default AuthorizedUserHeader;
