import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {refresh} from "../../services/api.services.ts";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";
import SearchResults from "../search-results-page/SearchResults.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import {Link} from "react-router";

export const RecipesPage = () => {

    const { recipes, total, skip, limit, loadState } = useAppSelector(state => state.recipeSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipeSliceActions.loadAuthRecipes(skip))
            .catch(reason => console.log(reason));
        refresh()
        dispatch(recipeSliceActions.loadAuthRecipes(skip))


    }, [skip]);


    return (
        <div>
            {!loadState && <div>Loading</div>}
            {recipes.map((recipe) => {return <div><h3><Link to={`/auth/recipes/${recipe.id}`}>{recipe.name}</Link></h3><p>{recipe.ingredients}</p></div>})}
            <Pagination total={total} skip={skip} limit={limit} setSkip={(value)=>dispatch(recipeSliceActions.setSkip(value))} />
            <SearchResults/>
        </div>
    );
};