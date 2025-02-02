import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IRecipe} from "../../models/IRecipe.ts";
import {axiosInstance} from "../../services/api.services.ts";
import {IResponseModelType} from "../../models/IResponceModel.ts";

type RecipeSliceType = {
    recipes: IRecipe[],
    total: number;
    skip: number;
    limit: number;
    loadState: boolean;
}

const initialState: RecipeSliceType = {
    recipes: [],
    total: 0,
    skip: 0,
    limit: 0,
    loadState: false
};


const loadAuthRecipes = createAsyncThunk(
    'recipeSlice/loadAuthRecipes',
    async (skip: number, thunkAPI) => {
        try {
            const {data} = await axiosInstance.get<IResponseModelType>(`/recipes?skip=${skip}`);
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue('Failed to load recipes');
        }
    }
)


const loadAuthRecipeID = createAsyncThunk(
    'recipeSlice/loadAuthRecipeID',
    async (id: number, thunkAPI) => {
        try {
            const {data} = await axiosInstance.get<IResponseModelType>(`/recipes/${id}`);
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue('Failed to load recipes');
        }
    }
)



const loadRecipeOfUser = createAsyncThunk(
    'recipeSlice/loadRecipeOfUser',
    async (userId:number, thunkAPI)=>{
        try {
            const {data} = await axiosInstance.get<IResponseModelType>(`/recipes`);
            const filteredRecipes = data.recipes.filter(recipe => recipe.userId === userId);
            return thunkAPI.fulfillWithValue({
                ...data,
                recipes: filteredRecipes,
                total: filteredRecipes.length})
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue('Failed to load recipes');
        }
    }
)




export const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;
        },
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadAuthRecipes.fulfilled, (state, action: PayloadAction<IResponseModelType>) => {
                state.recipes = action.payload.recipes;
                state.total = action.payload.total;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
            })
            .addCase(loadAuthRecipes.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addCase(loadRecipeOfUser.fulfilled, (state, action:PayloadAction<IResponseModelType>)=>{
                state.recipes=action.payload.recipes
            })
            .addCase(loadRecipeOfUser.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addCase(loadAuthRecipeID.fulfilled, (state, action:PayloadAction<IResponseModelType>)=>{
                state.recipes=action.payload.recipes
            })
            .addCase(loadAuthRecipeID.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addMatcher(isFulfilled(loadAuthRecipes, loadRecipeOfUser, loadAuthRecipeID), (state) => {
                state.loadState = true;

            })
            .addMatcher(isRejected(loadAuthRecipes, loadRecipeOfUser, loadAuthRecipeID), (state) => {
                console.log(state);
            })

});


export const recipeSliceActions = {
    ...recipeSlice.actions, loadAuthRecipes, loadRecipeOfUser, loadAuthRecipeID
};



