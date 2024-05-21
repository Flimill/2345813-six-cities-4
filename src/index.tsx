import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { store } from './store/index';
import { Provider } from 'react-redux';
import { checkAuth } from './store/api-actions';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

