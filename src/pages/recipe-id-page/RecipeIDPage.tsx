import { useParams} from "react-router";
import {useEffect} from "react";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const RecipeIDPage = () => {
    const dispatch = useAppDispatch();

    const {id}=useParams()
    const parsedID = id ? parseInt(id):0;

    console.log(typeof parsedID);
    console.log(parsedID)
    const  recipes  = useAppSelector(state => state.recipeSlice);
    console.log('test', recipes);
    // const recipe = recipes.find(recipe => recipe.id === parsedID);
    // console.log(recipe);



    useEffect(() => {
        dispatch(recipeSliceActions.loadAuthRecipeID(parsedID));
    }, [parsedID]);


    return (
        <div>

            jhbjbjbjbj

        </div>
    );
};


