import React from 'react';

import styles from './style.module.css';
import { SearchContext } from '../../App';

const Search = () => {
    const { search, setSearch } = React.useContext(SearchContext);

    return (
        <div className={styles.input_wrapper}>
            <svg
                className={styles['search-icon']}
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="10"
                    cy="10"
                    r="6"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.5 14.5L19 19"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <input
                className={styles.search}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                name="q"
                placeholder="Поиск пиццы..."
            />
            {search && (
                <svg
                    className={styles.close}
                    onClick={() => setSearch('')}
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24px"
                    height="24px"
                    viewBox="0 0 50 50">
                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                </svg>
            )}
        </div>
    );
};
export default Search;
