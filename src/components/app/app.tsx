import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import MainPage from '../main-page/main-page';
import OfferPage from '../offer-page/offer-page';
import Error404Page from '../error404-page/error404-page';
import ErrorBoundary from '../error-boundary/error-boundary';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
