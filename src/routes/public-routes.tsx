import {Route, Routes } from 'react-router-dom';
import MainPage from '../main/main-page';
import LoginPage from '../login/login-page';
import OfferPage from '../offer/offer-page';
import Error404Page from '../error/error404-page';

type Props = {
    offersCount: number;
}

function PublicRoutes({offersCount}: Props): JSX.Element{
  return (
    <Routes>
      <Route path="/" element={ <MainPage offersCount = {offersCount} />}>
      </Route>

      <Route path="/login" element={ <LoginPage/>}>
      </Route>

      <Route path="/offer/:id" element={ <OfferPage/>}>
      </Route>

      <Route
        path="*"
        element={<Error404Page/>}
      />

    </Routes>
  );
}

export default PublicRoutes;
