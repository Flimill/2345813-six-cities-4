import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FavoritesPage from '../favorites/favorites-page';
import LoginPage from '../login/login-page';
import MainPage from '../main/main-page';
import OfferPage from '../offer/offer-page';
import Error404Page from '../error/error404-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

