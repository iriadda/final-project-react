import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        if (query.trim()) {
            const searchType = location.pathname.includes('/users') ? 'users' : 'recipes';
            navigate(`/${searchType}/search?q=${query}`);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Пошук..."/>
            <button onClick={handleSearch}>🔍</button>
        </div>
    );
};


