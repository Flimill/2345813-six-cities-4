import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { store } from './store/index';
import { Provider } from 'react-redux';
import OFFERS from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App
        offersCount = {5}
        offers={OFFERS}
        isAuthenticated
      />
    </React.StrictMode>
  </Provider>

);
