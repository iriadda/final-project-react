import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Link} from "react-router";
import {retriveLocalStorage} from "../../services/helpers.ts";
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";
import {Search} from "../search/Search.tsx";



export const Menu = () => {
    const {isAuthenticated} = useAppSelector(({authSlice}) => authSlice);
    console.log(isAuthenticated);

    const storedUser:IUserWithTokens = retriveLocalStorage('user');
    console.log(storedUser)

    return (
        <nav>
            {isAuthenticated ? (<ul>
                <li><Link to={'/'}>home</Link></li>
                <li><Link to={'auth/users'}>users</Link></li>
                <li><Link to={'auth/recipes'}>recipes</Link></li>
                <li><Search/></li>
                <li>{storedUser.firstName} {storedUser.lastName}</li>
                <li><img src={storedUser.image} alt=""/></li>
            </ul>) : (
                <ul>
                    <li><Link to="/login">Увійти</Link></li>
                </ul>)
            }
        </nav>
    );
};

