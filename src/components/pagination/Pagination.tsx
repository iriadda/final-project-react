import {FC} from "react";

interface PaginationProps {
    total: number;
    skip: number;
    limit: number;
    setSkip: (newSkip: number) => void;
}

const Pagination:FC<PaginationProps> = ({ total, skip, limit, setSkip }) => {
    const nextPage = () => {
        if (skip + limit < total) {
            setSkip(skip + limit);
        }
    };

    const prevPage = () => {
        if (skip - limit >= 0) {
            setSkip(skip - limit);
        }
    };

    return (
        <div>
            <button onClick={prevPage} disabled={skip === 0}>Previous</button>

            <button onClick={nextPage} disabled={skip + limit >= total}>Next</button>
        </div>
    );
};

export default Pagination;



