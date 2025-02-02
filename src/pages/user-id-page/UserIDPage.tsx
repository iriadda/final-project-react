import {useLocation, useNavigate} from "react-router";
import {IUser} from "../../models/IUser.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";
import {useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const UserIDPage = () => {
    const { state } = useLocation();
    console.log(state);
    const user = state as IUser;


    const { recipes } = useAppSelector(state => state.recipeSlice);
    const dispatch = useAppDispatch();


    const navigate = useNavigate();
    const handleClick = (id: number) => {
        navigate(`/auth/recipes/${id}`);
    };


    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipeOfUser(user.id));
    }, [user.id]);


    return (
        <div key={user.id}>
            <h3>Hello, I`m {user.username} {user.lastName}</h3>
            <p>My email: {user.email}</p>
            <p>I live in {user.address.country}, {user.address.state}, {user.address.city}</p>
            <p>My education: {user.university}</p>
            <p>My recipes:</p>
                <ul>
                    {recipes.map(recipe => (
                            <li key={recipe.id}>{recipe.name}
                                <button onClick={() => handleClick(recipe.id)}>details</button>

                            </li>
                        ))
                    }
                </ul>

        </div>
    );
};