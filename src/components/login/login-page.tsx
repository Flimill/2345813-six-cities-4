import { useState } from 'react';
import { InternalRoutes } from '../../const/const';
import { sendLoginData } from '../../store/api-actions';
import { RootState, store } from '../../store';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cityList from '../../const/city-list';
import { saveSelectedCity } from '../../utils/city-storage';

const city = cityList[Math.floor(Math.random() * cityList.length)];

function LoginPage(): JSX.Element {
  const { isLoading, authorizationStatus } = useSelector((state: RootState) => ({
    isLoading: state.status.isLoading,
    authorizationStatus: state.user.authorizationStatus,
  }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.dispatch(sendLoginData({email, password}));
  };
  if (isLoading) {
    return <span>Please wait.</span>;
  }
  if (authorizationStatus){
    return <Navigate to={InternalRoutes.Main}/>;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href={InternalRoutes.Main} onClick={()=>saveSelectedCity(city)}>
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
