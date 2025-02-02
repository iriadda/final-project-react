import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        loginSlice: loginStale.reducer,
        userSlice: userSlice.reducer,
        recipesSlice: recipe
    }
});