import { render, screen } from '@testing-library/react';
import OfferListComponent from './offer-list-component';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { OfferCardData } from '../../types/types';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([]);
const mockOffers: OfferCardData[] = [
  {
    id: '1',
    title: 'Test Offer 1',
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
    previewImage: 'img/test1.jpg',
  },
  {
    id: '2',
    title: 'Test Offer 2',
    type: 'House',
    price: 150,
    city: {
      name: 'Berlin',
      location: {
        latitude: 52.520008,
        longitude: 13.404954,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.520008,
      longitude: 13.404954,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    previewImage: 'img/test2.jpg',
  },
];

describe('OfferListComponent', () => {
    it('should render loading message when isLoading is true', () => {
      const store = mockStore({ status: { isLoading: true }, user: { authorizationStatus: 'authenticated' } });
      render(
        <Provider store={store}>
          <OfferListComponent offers={mockOffers} sortingOption={null} isMapOn={false} />
        </Provider>
      );
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  

  });