import React from 'react';
import { InternalRoutes } from '../../const/const';

function UnauthorizedUserHeader(): JSX.Element {
  return(
    <li className="header__nav-item user">
      <a className="header__nav-link header__nav-link--profile" href={InternalRoutes.Login}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </a>
    </li>
  );
}

const MemoizedUnauthorizedUserHeader = React.memo(UnauthorizedUserHeader);

export default MemoizedUnauthorizedUserHeader;
