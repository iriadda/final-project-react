import {createBrowserRouter} from "react-router";
import {HomePage} from "../pages/home-page/HomePage.tsx";
import {LoginPage} from "../pages/login-page/LoginPage.tsx";
import {UsersPage} from "../pages/users-page/UsersPage.tsx";
import {RecipesPage} from "../pages/recipes-page/RecipesPage.tsx";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {RecipeIDPage} from "../pages/recipe-id-page/RecipeIDPage.tsx";
import {UserIDPage} from "../pages/user-id-page/UserIDPage.tsx";
import SearchResults from "../pages/search-results-page/SearchResults.tsx";


export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'auth/users', element: <UsersPage/>},
            {path: 'auth/users/:id', element: <UserIDPage/>},
            {path: "/users/search", element:<SearchResults/>},
            {path: 'auth/recipes', element: <RecipesPage/>},
            {path: 'auth/recipes/:id', element: <RecipeIDPage/>},
            {path: "/recipes/search", element:<SearchResults/>},
        ]
    }
]);