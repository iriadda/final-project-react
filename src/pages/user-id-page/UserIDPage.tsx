import {Link, useLocation} from "react-router";
import {IUser} from "../../models/IUser.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";

export const UserDetailsPage = () => {

    const {state} = useLocation();
    const user = state as IUser;

    const dispatch = useAppDispatch()

    return (
        <div>
            <h3> Hello, I`m {user.username} {user.lastName}</h3>
            <p>My email: {user.email}</p>
            <p>I live in {user.address.country}, {user.address.state}, {user.address.city}</p>
            <p>Country: {user.address.country}</p>
            <p>My education: {user.university}</p>
            <p>My recipes:</p>
            <ul><li><Link to={'/'}>{}</Link></li></ul>
        </div>
    );
};