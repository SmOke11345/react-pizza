import React from 'react';
import axios from 'axios';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/pizzaItem/PizzaItem';
import Skeleton from './components/pizzaItem/Skeleton';

import styles from './assets/scss/app.module.css';

function App() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    console.log(isLoading);

    React.useEffect(() => {
        setIsLoading(true);
        axios
            .get('https://6458b2368badff578ef810ab.mockapi.io/items')
            .then((res) => {
                const newItems = res.data;
                setItems(newItems);
            })
            .catch((error) => {
                console.warn(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    // deps[] используется для того чтобы отслеживать изменения в компонентах и заново выполнять ту функцию которая
    // находиться внутри useEffect, если deps оставить пустым это значит что нужно запустить данный код только
    // единожды при первой загрузке
    return (
        <>
            <div className={styles.wrapper}>
                <Header />
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div className={styles.content__top}>
                            <Categories />
                            <Sort />
                        </div>
                        <h2 className={styles.content__title}>Все пиццы</h2>
                        <div className={styles.content__items}>
                            {isLoading
                                ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                                : items.map((item) => <PizzaItem key={item.id} {...item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
