import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FavoritesPage from './favorites-page';
import { LoadingMessage } from '../../const/const';


const mockStore = configureMockStore([]);

describe('FavoritesPage', () => {
  it('should render loading message when isLoading is true', () => {
    const store = mockStore({ status: { isLoading: true }, user: { authorizationStatus: 'authenticated' }, favorite: { favoriteOfferList: [] } });
    render(
      <Provider store={store}>
        <FavoritesPage />
      </Provider>
    );
    expect(screen.getByText(LoadingMessage.Favorites)).toBeInTheDocument();
  });

  it('should render empty favorites message when favoriteOfferList is empty', () => {
    const store = mockStore({ status: { isLoading: false }, user: { authorizationStatus: 'authenticated' }, favorite: { favoriteOfferList: [] } });
    render(
      <Provider store={store}>
        <FavoritesPage />
      </Provider>
    );
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

 
});


