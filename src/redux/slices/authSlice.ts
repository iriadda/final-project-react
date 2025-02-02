import {createSlice} from "@reduxjs/toolkit";

type loginSliceType={
    username: string,
    password: string
}

const initialState: loginSliceType = {username: "", password: ""};

export const loginSlice = createSlice({
    name: "Slice",
    initialState: initialState,
    reducers: {
        // changeLoadState: (state, action: PayloadAction<boolean>) => {
        //     state.loadState = action.payload;
        //
        // }
    },
    extraReducers: builder =>
        builder
            // .addCase(load_.fulfilled, (state, action: PayloadAction<I_[]>) => {
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