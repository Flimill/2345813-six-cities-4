import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FavoritesPage from '../favorites/favorites-page';
import LoginPage from '../login/login-page';
import MainPage from '../main/main-page';
import OfferPage from '../offer/offer-page';
import Error404Page from '../error/error404-page';

type AppProps = {
  isAuthenticated: boolean;
};

function App({ isAuthenticated}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/favorites" element={<FavoritesPage />} />
        ) : (
          <Route path="/favorites" element={<LoginPage />} />
        )}

        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

