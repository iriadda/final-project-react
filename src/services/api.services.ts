import {retriveLocalStorage} from "./helpers.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import axios from "axios";
import {ITokenPair} from "../models/ITokenPair.ts";




type LoginData = {
    username: string;
    password: string;
    expiresInMins: number
}

export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});


axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken
    }
    return requestObject;

})


export const login = async ({ username, password, expiresInMins = 30 }:LoginData) => {
    const { data: userWithTokens } = await axiosInstance.post<IUserWithTokens>("/login", { username, password, expiresInMins });
    localStorage.setItem("user", JSON.stringify(userWithTokens));
    return userWithTokens;
};

export const refresh = async () => {

    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMin: 30
    });
    iUserWithTokens.accessToken = accessToken;
    iUserWithTokens.refreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));
}



