import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import OfferCard from './offer-card';
import { OfferCardData } from '../../types/types';
import { changeSelectedPoint} from '../../store/action';
import { InternalRoute, MAX_RATING } from '../../const/const';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockOffer: OfferCardData = {
  id: '1',
  title: 'Test Offer',
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


describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <OfferCard isAuth={true} offer={mockOffer} isMapOn={false} />
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /in bookmarks/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test offer/i })).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
  });



  it('should redirect to login when bookmark button is clicked and user is not authenticated', async () => {
    const store = mockStore({});

    render(
      <BrowserRouter > {/* Обеспечиваем контекст роутинга */}
        <Provider store={store}>
          <OfferCard isAuth={false} offer={mockOffer} isMapOn={false} />
        </Provider>
      </BrowserRouter >
    );

    const bookmarkButton = screen.getByRole('button', { name: /in bookmarks/i });
    await userEvent.click(bookmarkButton);

    
    expect(window.location.pathname).toBe('/login'); // Меняем на строку адреса, которая должна быть в случае перенаправления
  });

  it('should display correct rating', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <OfferCard isAuth={true} offer={mockOffer} isMapOn={false} />
      </Provider>
    );

    const ratingWidth = `${(Math.round(mockOffer.rating) / MAX_RATING) * 100}%`;
    const ratingElement = screen.getByText('Rating').previousElementSibling;

    expect(ratingElement).toHaveStyle(`width: ${ratingWidth}`);
  });

  it('should navigate to offer page when image or title is clicked', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <OfferCard isAuth={true} offer={mockOffer} isMapOn={false} />
      </Provider>
    );

    const offerLink = `${InternalRoute.Offer}${mockOffer.id}`;
    const imageLink = screen.getByRole('img', { name: /test offer/i }).closest('a');
    const titleLink = screen.getByText('Test Offer').closest('a');

    expect(imageLink).toHaveAttribute('href', offerLink);
    expect(titleLink).toHaveAttribute('href', offerLink);
  });


  it('should dispatch changeSelectedPoint when mouse enters the card and isMapOn is true', () => {
    const store = mockStore({});
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <OfferCard isAuth={true} offer={mockOffer} isMapOn={true} />
      </Provider>
    );

    fireEvent.mouseEnter(screen.getByText('Test Offer'));

    expect(dispatchSpy).toHaveBeenCalledWith(changeSelectedPoint({
      location: mockOffer.location,
      name: mockOffer.title,
    }));
  });
});
