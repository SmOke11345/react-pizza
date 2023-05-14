import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/pizzaItem/Skeleton';
import PizzaItem from '../components/pizzaItem/PizzaItem';
import Pagination from '../components/Pagination';

import styles from '../assets/scss/app.module.css';

import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
    const { search } = React.useContext(SearchContext);

    const { category, sortProp, currentPage } = useSelector((state) => state.filter);
    const sortType = sortProp.sortName;

    // const category = useSelector((state) => state.filter.category);
    // const sortType = useSelector((state) => state.filter.sortProp.sortName);
    // const pageCount = useSelector((state) => state.filter.currentPage);
    const dispatch = useDispatch();

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const request = `?category=${category}`;

    React.useEffect(() => {
        setIsLoading(true);

        const categoryUrl = category > 0 ? `${request}&` : '?';
        const sortBy = sortType.replace('-', '');
        // sort asc or desc
        const sortAD = sortType.includes('-') ? 'asc' : 'desc';
        const searchValue = search ? `&search=${search}` : '';

        axios
            .get(
                `https://6458b2368badff578ef810ab.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrl}sortBy=${sortBy}&order=${sortAD}${searchValue}`,
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
    }, [category, sortType, search, currentPage]);
    // deps[] используется для того чтобы отслеживать изменения в компонентах и заново выполнять ту функцию которая
    // находиться внутри useEffect, если deps оставить пустым это значит что нужно запустить данный код только
    // единожды при первой загрузке

    // Делается для того чтобы при первой загрузке сразу отображалось как минимум 6
    // элементов skeleton, так же чтобы при первой загрузке контент не прыгал
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    const pizza = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(search.toLowerCase())) {
                return true;
            }
        })
        .map((item) => <PizzaItem key={item.id} {...item} />);

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
                        value={category}
                        onChangeCategory={(index) => {
                            dispatch(setCategory(index));
                        }}
                    />
                    <Sort />
                </div>
                <h2 className={styles.content__title}>Все пиццы</h2>
                <div className={styles.content__items}>{isLoading ? skeleton : pizza}</div>
                <Pagination
                    currentPage={currentPage}
                    onChangePage={(number) => dispatch(setCurrentPage(number))}
                />
            </div>
        </>
    );
};
export default Home;
