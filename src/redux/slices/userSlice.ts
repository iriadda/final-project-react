import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser.ts";

type UserSliceType={
    users:IUser[],
    user: IUser | null,
    loadState: boolean
}
const initialState: UserSliceType = {users:[], user: null, loadState: false};

export const userSlice = createSlice({
    name: "Slice",
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;

        }
    },
    extraReducers: builder =>
        builder
            // .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
            //     state.users = action.payload
            // })
            // .addCase(loadUsers.rejected, (state, action) => {
            //     console.log(state);
            //     console.log(action);
            // })
            // .addMatcher(isFulfilled(loadUsers), (state) => {
            //     state.loadState = true;
            // })
            // .addMatcher(isRejected( loadUsers), (state) => {
            //     console.log(state);
            // })

});