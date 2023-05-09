import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaItem/Skeleton';
import PizzaItem from '../components/pizzaItem/PizzaItem';

import styles from '../assets/scss/app.module.css';

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryID] = React.useState(0);

    // можно сказать что это как бы стандартное значение, но в дальнейшем в этот объект будут добавляться новые
    const [sort, setSort] = React.useState({
        name: 'популярности (↑)',
        sortName: 'rating',
    });
    //&sortBy=${sortingName[sort]}

    const request = `?category=${categoryID}`;

    console.log(sort);
    React.useEffect(() => {
        setIsLoading(true);

        const category = categoryID > 0 ? `${request}&` : '?';
        const sortBy = sort.sortName.replace('-', '');
        // sort asc or desc
        const sortAD = sort.sortName.includes('-') ? 'asc' : 'desc';

        axios
            .get(
                `https://6458b2368badff578ef810ab.mockapi.io/items${category}sortBy=${sortBy}&order=${sortAD}`,
            )
            .then((res) => {
                const newItems = res.data;
                setItems(newItems);
            })
            .catch((error) => {
                console.warn(error);
            })
            .finally(() => {
                setIsLoading(false);
                window.scroll(0, 0);
            });
    }, [categoryID, sort]);
    // deps[] используется для того чтобы отслеживать изменения в компонентах и заново выполнять ту функцию которая
    // находиться внутри useEffect, если deps оставить пустым это значит что нужно запустить данный код только
    // единожды при первой загрузке

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content__top}>
                    {/*
                     чтобы передать параметры нужно все state из дочерних компонентов перенести в родительский, и
                     далее передать эти параметры в качестве пропсов, в свою очередь пропсы должны взять
                     значения из дочерних компонентов и передать их в родительский state 
                     */}
                    {/*функция говорит что нужно взять index*/}
                    <Categories
                        value={categoryID}
                        onChangeCategory={(index) => {
                            setCategoryID(index);
                        }}
                    />
                    <Sort
                        value={sort}
                        onChangeSort={(index) => {
                            setSort(index);
                        }}
                    />
                </div>
                <h2 className={styles.content__title}>Все пиццы</h2>
                <div className={styles.content__items}>
                    {isLoading
                        ? // Делается для того чтобы при первой загрузке сразу отображалось как минимум 6
                          // элементов skeleton, так же чтобы при первой загрузке контент не прыгал
                          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : items.map((item) => <PizzaItem key={item.id} {...item} />)}
                </div>
            </div>
        </>
    );
};
export default Home;
