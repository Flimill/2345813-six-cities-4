import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import OfferPage from './offer-page';

describe('OfferPage', () => {
  it('should display loading message', () => {
    render(
      <Provider store={store}>
        <OfferPage />
      </Provider>
    );


    const loadingMessageElement = screen.getByText('Uploading offer. Please wait.');
    expect(loadingMessageElement).toBeInTheDocument();
  });
});
