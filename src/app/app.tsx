import { BrowserRouter} from 'react-router-dom';
import PublicRoutes from '../routes/public-routes';
import PrivateRoutes from '../routes/private-routes';

type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <PrivateRoutes isAuthenticated={false} />
      <PublicRoutes offersCount = {offersCount}/>
    </BrowserRouter>

  );
}

export default App;
