import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from './login-page';
import { LoadingMessage, InternalRoute } from '../../const/const';
import { MemoryRouter } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: LoginPage', () => {
    it('should render correctly', () => {
        const store = mockStore({
          status: { isLoading: false, error: null },
          user: { authorizationStatus: false },
        });
    
        render(
          <Provider store={store}>
            <MemoryRouter>
              <LoginPage />
            </MemoryRouter>
          </Provider>
        );
    
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      });

  it('should show loading message when isLoading is true', () => {
    const store = mockStore({
      status: { isLoading: true, error: null },
      user: { authorizationStatus: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(LoadingMessage.Neutral)).toBeInTheDocument();
  });

  it('should redirect to main page when authorizationStatus is true', () => {
    const store = mockStore({
      status: { isLoading: false, error: null },
      user: { authorizationStatus: true },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[InternalRoute.Login]}>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should display validation error when error is VALIDATION_ERROR', () => {
    const store = mockStore({
      status: { isLoading: false, error: 'VALIDATION_ERROR' },
      user: { authorizationStatus: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Некорректый email или пароль! Пароль должен содержать 1 букву и 1 цифру! Email должен быть подобного вида: user@a.com!')).toBeInTheDocument();
  });

  it('should update email and password fields when user types', async () => {
    const store = mockStore({
      status: { isLoading: false, error: null },
      user: { authorizationStatus: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
  });
});
