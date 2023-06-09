import React from 'react';

import { useAppDispatch } from '../redux/hook.ts';
import { useWhyDidYouUpdate } from 'ahooks';
import { SortEnum, SortProp } from '../redux/filter/types.ts';
import { setSort } from '../redux/filter/slice.ts';

import styles from '../assets/scss/app.module.css';

// Для создания своего типа данных

export const list: SortProp[] = [
    { name: 'популярности (↓)', sortName: SortEnum.RATING_DESC },
    { name: 'популярности (↑)', sortName: SortEnum.RATING_ASC },
    { name: 'цене (↓)', sortName: SortEnum.PRICE_DESC },
    { name: 'цене (↑)', sortName: SortEnum.PRICE_ASC },
    { name: 'алфавиту (↓)', sortName: SortEnum.TITLE_DESC },
    { name: 'алфавиту (↑)', sortName: SortEnum.TITLE_ASC },
];

type SortProps = {
    value: SortProp;
};

const Sort: React.FC<SortProps> =
    /* нужен для того чтобы, предотвратить лишние перерисовки компонента */ React.memo(
        ({ value }) => {
            // показывает все перерисовки компонента
            useWhyDidYouUpdate('Sort', { value });

            const [open, setOpen] = React.useState(false);

            // Смотрим тип данных у элемента к которому мы добавляем useRef и по умолчанию нужно хранить null
            const sortRef = React.useRef<HTMLSpanElement>(null!);

            const dispatch = useAppDispatch();

            React.useEffect(() => {
                const handleClick = (event: MouseEvent) => {
                    if (sortRef.current && event.target !== sortRef.current) {
                        setOpen(false);
                    }
                };
                // Так можно делать только в том случая когда такого элемента нет в данном компоненте,
                // в отличных случаях используется useRef
                document.body.addEventListener('click', handleClick);

                // Нужно для размонтирования (Происходит после того как мы допустим, перейдем на другую страницу)
                return () => {
                    document.body.removeEventListener('click', handleClick);
                };
            }, []);

            return (
                <div className={styles.sort}>
                    <div className={styles.sort__label}>
                        {open ? (
                            <svg
                                style={{ transform: 'rotate(180deg)' }}
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#2C2C2C"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                    fill="#2C2C2C"
                                />
                            </svg>
                        )}
                        <b>Сортировка по:</b>
                        <span ref={sortRef} onClick={() => setOpen(!open)}>
                            {value.name}
                        </span>
                    </div>
                    {open && (
                        <div className={styles.sort__popup}>
                            <ul>
                                {list.map((obj, index) => {
                                    return (
                                        // здесь сравниваются два объекта, и родитель обязательно должен хранить какой либо
                                        // схожий объект чтобы все корректно отображалось
                                        <li
                                            key={index}
                                            onClick={() => {
                                                dispatch(setSort(obj));
                                                setOpen(!open);
                                            }}
                                            className={
                                                value.sortName === obj.sortName
                                                    ? `${styles.active}`
                                                    : ''
                                            }>
                                            {obj.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            );
        },
    );
export default Sort;
