import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AuthorizedUserHeader from './authorized-user-header';
import { InternalRoute } from '../../const/const';
import MemoizedUnauthorizedUserHeader from './unauthorized-user-header';


function HeaderComponent(): JSX.Element {

  const authorizationStatus:boolean = useSelector((state: RootState) => state.user.authorizationStatus);
  return(
    <div className="header__wrapper">
      <div className="header__left">
        <a className="header__logo-link header__logo-link--active" href={InternalRoute.Main}>
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
        </a>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          {(authorizationStatus) ? <AuthorizedUserHeader/> : <MemoizedUnauthorizedUserHeader/>}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderComponent;
