import {createSlice} from "@reduxjs/toolkit";


interface AuthState {
    isAuthenticated: boolean;
    // user: IUserWithTokens | null;
    // loading: boolean;
    // error: string | null;
}


const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
    isAuthenticated: !!storedUser,
    // user: storedUser ? JSON.parse(storedUser) : null,
    // loading: false,
    // error: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const authSliceActions = {
    ...authSlice.actions
}




