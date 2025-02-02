import {Outlet} from "react-router";
import {Menu} from "../components/menu/Menu.tsx";

export const MainLayout = () => {
    return (
        <>
            <Menu/>
        <Outlet/>
        </>
    );
};