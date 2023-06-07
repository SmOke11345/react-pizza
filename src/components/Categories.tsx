import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

import styles from '../assets/scss/app.module.css';

const initCategory = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
    value: number;
    onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> =
    /* нужен для того чтобы, предотвратить лишние перерисовки компонента */ React.memo(
        ({ value, onChangeCategory }) => {
            // показывает все перерисовки компонента
            useWhyDidYouUpdate('Categories', { value, onChangeCategory });

            return (
                <div className={styles.categories}>
                    <ul>
                        {initCategory.map((category, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        onChangeCategory(index);
                                    }}
                                    className={value === index ? `${styles.active}` : ''}>
                                    {category}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        },
    );

export default Categories;
