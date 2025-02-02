import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser.ts";
import {axiosInstance} from "../../services/api.services.ts";
import {IResponseModelType} from "../../models/IResponceModel.ts";


type UserSliceType = {
    users: IUser[],
    total: number;
    skip: number;
    limit: number;
    loadState: boolean;
};

const initialState: UserSliceType = {
    users: [],
    total: 0,
    skip: 0,
    limit: 0,
    loadState: false
};

export const loadAuthUsers = createAsyncThunk(
    "userSlice/loadAuthUsers",
    async (skip:number, thunkApi) => {
        try {
            const { data } = await axiosInstance.get<IResponseModelType>(`/users?skip=${skip}`);
            return thunkApi.fulfillWithValue(data);
        } catch (error) {
            console.error( error);
            return thunkApi.rejectWithValue("Failed to load users");
        }
    }
);

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
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
            .addCase(loadAuthUsers.fulfilled, (state, action: PayloadAction<IResponseModelType>) => {
                state.users = action.payload.users;
                state.total = action.payload.total;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
            })
            .addCase(loadAuthUsers.rejected, (state, action) => {
                console.log(state);
                console.log( action);
            })
            .addMatcher(isFulfilled(loadAuthUsers), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadAuthUsers), (state) => {
                console.log(state);
            })
});

export const userSliceActions = {
    ...userSlice.actions, loadAuthUsers,
};
