import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MainPage from './main-page';

describe('MainPage', () => {
  it('should render MainPage component', async () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading. Please wait.'));

    const mainPageElement = screen.getByTestId('main-page');
    expect(mainPageElement).toBeInTheDocument();
  });
});
