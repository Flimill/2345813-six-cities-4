import {Route, Routes} from 'react-router-dom';
import FavouritesPage from '../favourites/favourites-page';
import LoginPage from '../login/login-page';

type Props = {
    isAuthenticated: boolean;
    redirectTo: string;
}

function PrivateRoutes({isAuthenticated,redirectTo}: Props): JSX.Element{
    if(isAuthenticated){
        return (
            <Routes>
            
                <Route path="/favorites" element={ <FavouritesPage/>}>
                </Route>
    
            </Routes>
        )
    }
    else{
        return <Routes>
            <Route path="/favorites" element={<LoginPage />}></Route>
        </Routes>
    }
    
}

export default PrivateRoutes;