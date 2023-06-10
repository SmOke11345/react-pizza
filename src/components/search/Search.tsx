import React from 'react';

// Используется для создания задержки при вводе запроса, т.е при вводе нового символа задержка обновляется,
// до тех пор, пока пользователь не перестанет вводить свой запрос
// (но лучше найти что-то полегче, т.к нужно создавать контролируемый импут локально)
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/store.ts';

import styles from './style.module.css';
import { setSearchValue } from '../../redux/filter/slice.ts';

const Search: React.FC = () => {
    const [value, setValue] = React.useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    // Для обращения к DOM элемента в React
    const searchRef = React.useRef<HTMLInputElement>(null!);

    // useCallback, используется для того чтобы, обозначить те функции,
    // которые не нужно каждый раз пересоздавать (создай только один раз и больше не пересоздавай),
    // в deps указываются эти функции (на подобии useEffect), только в отличии от useEffect, он возвращает (отложенную)функцию.
    const LoadSearch = React.useCallback(
        debounce((value) => {
            dispatch(setSearchValue(value));
        }, 1000),
        [],
    );

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
            {/* На подобии с useRef смотрим через подсказку (при наведении на onChange) 
            в <> ставим interface родителя этого метода*/}
            <input
                ref={searchRef}
                className={styles.search}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);
                    LoadSearch(event.target.value);
                }}
                type="text"
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    className={styles.close}
                    onClick={() => {
                        setValue('');
                        dispatch(setSearchValue(''));
                        searchRef.current?.focus();
                    }}
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
