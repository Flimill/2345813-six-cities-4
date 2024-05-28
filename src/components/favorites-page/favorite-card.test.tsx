import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import FavoriteCard from './favorite-card';
import { OfferCardData } from '../../types/types';
import { InternalRoute, MAX_RATING } from '../../const/const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockFavorite: OfferCardData = {
  id: '1',
  title: 'Test Title',
  type: 'Apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.374031,
      longitude: 4.88969,
      zoom: 12,
    },
  },
  location: {
    latitude: 52.374031,
    longitude: 4.88969,
    zoom: 12,
  },
  isFavorite: true,
  isPremium: true,
  rating: 4.5,
  previewImage: 'img/test.jpg',
};

describe('Component: FavoriteCard', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <FavoriteCard favorite={mockFavorite} />
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /in bookmarks/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });


  it('should display correct rating', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <FavoriteCard favorite={mockFavorite} />
      </Provider>
    );

    const ratingWidth = `${(Math.round(mockFavorite.rating) / MAX_RATING) * 100}%`;
    const ratingElement = screen.getByText('Rating').previousElementSibling;

    expect(ratingElement).toHaveStyle(`width: ${ratingWidth}`);
  });

  it('should navigate to offer page when image or title is clicked', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <FavoriteCard favorite={mockFavorite} />
      </Provider>
    );

    const offerLink = `${InternalRoute.Offer}${mockFavorite.id}`;
    const imageLink = screen.getByRole('img', { name: /test title/i }).closest('a');
    const titleLink = screen.getByText('Test Title').closest('a');

    expect(imageLink).toHaveAttribute('href', offerLink);
    expect(titleLink).toHaveAttribute('href', offerLink);
  });
});
