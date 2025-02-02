import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {IResponseModelType} from "../../models/IResponceModel.ts";


const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const location = useLocation();
    const [results, setResults] = useState<IResponseModelType>({
        total: 0,
        skip: 0,
        limit: 0,
        users: [],
        recipes: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        const searchType = location.pathname.includes('/users') ? 'users' : 'recipes';

        const isId = /^\d+$/.test(query);

        const url = isId
            ? `https://dummyjson.com/${searchType}/${query}`
            : `https://dummyjson.com/${searchType}/search?q=${query}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (isId) {
                    setResults({
                        total: 1,
                        skip: 0,
                        limit: 1,
                        users: searchType === 'users' ? [data] : [],
                        recipes: searchType === 'recipes' ? [data] : [],
                    });
                } else {
                    setResults({
                        total: data.total || 0,
                        skip: data.skip || 0,
                        limit: data.limit || 0,
                        users: data.users || [],
                        recipes: data.recipes || [],
                    });
                }
            })
            .finally(() => setLoading(false));
    }, [query, location.pathname]);
    return (
        <div>
            <h2>Результати пошуку для: "{query}"</h2>
            {loading && <p>Завантаження...</p>}
            {!loading && (results.users.length > 0 || results.recipes.length > 0) ? (
                <ul>
                    {results.users.length > 0 &&
                        results.users.map((user) => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    {results.recipes.length > 0 &&
                        results.recipes.map((recipe) => (
                            <li key={recipe.id}>{recipe.name}</li>
                        ))}
                </ul>
            ) : (
                <p>Нічого не знайдено</p>
            )}
        </div>
    );
};

export default SearchResults;
