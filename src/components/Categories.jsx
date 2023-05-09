import React from 'react';

import styles from '../assets/scss/app.module.css';

const initCategory = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ value, onChangeCategory }) => {
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
};

export default Categories;
