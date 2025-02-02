import {createBrowserRouter} from "react-router";

export const router = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {index: true, element: <HomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'auth/users', element: <UsersPage/>},
            {path: 'auth/recipes', element: <RecipesPage/>}
        ]
    }
]);