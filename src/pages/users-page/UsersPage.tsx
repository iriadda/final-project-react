import {useEffect} from "react";
import {refresh} from "../../services/api.services.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {userSliceActions} from "../../redux/slices/userSlice.ts";
import {Link} from "react-router";
import Pagination from "../../components/pagination/Pagination.tsx";
import SearchResults from "../search-results-page/SearchResults.tsx";



export const UsersPage = () => {


    const { users, total, skip, limit, loadState } = useAppSelector(state => state.userSlice);
    console.log(users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userSliceActions.loadAuthUsers(skip))
            .catch(reason => console.log(reason));
        refresh()
        dispatch(userSliceActions.loadAuthUsers(skip))

    }, [skip]);


    return (
        <div>
            {!loadState && <div>Loading</div>}

            {
                users.map((user) => {
                    return <ul key={user.id}><li><Link to={`${user.id}`} state={user}>{user.id}{user.username}</Link></li></ul>
                })
            }
            <Pagination
                total={total}
                skip={skip}
                limit={limit}
                setSkip={(value) => dispatch(userSliceActions.setSkip(value))}
            />
            {<SearchResults/>}
        </div>
    );
};