import React from 'react';

import styles from '../assets/scss/app.module.css';

const initCategory = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className={styles.categories}>
            <ul>
                {initCategory.map((category, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                setActiveIndex(index);
                            }}
                            className={activeIndex === index ? `${styles.active}` : ''}>
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
