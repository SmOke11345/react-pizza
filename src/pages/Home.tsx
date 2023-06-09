import React from 'react';
// Библиотека для извлечения и управления параметрами URL запроса
// @ts-ignore
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/pizzaItem/Skeleton';
import PizzaItem from '../components/pizzaItem';
import Pagination from '../components/Pagination';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook.ts';
import { fetchItemsPizza } from '../redux/pizza/asyncThunk.ts';
import { fetchPizzaArgs } from '../redux/pizza/types.ts';
import { setCategory, setCurrentPage, setFilters } from '../redux/filter/slice.ts';

import styles from '../assets/scss/app.module.css';

const Home: React.FC = () => {
    // const category = useSelector((state) => state.pizza.category);
    // const sortType = useSelector((state) => state.pizza.sortProp.sortName);
    // const pageCount = useSelector((state) => state.pizza.currentPage);
    const { category, sortProp, currentPage, searchValue } = useAppSelector(
        (state) => state.filter,
    );
    const { items, status } = useAppSelector((state) => state.pizzas);
    const sortType = sortProp.sortName;

    const dispatch = useAppDispatch();
    // Для передачи параметров запроса в поисковую строку
    const navigate = useNavigate();

    // const isSearch = React.useRef(false);
    // для того чтобы при первой загрузке страницы в поисковой строке не оставались какое-либо данные из переменной navigate
    const isMounted = React.useRef(false);

    const request = `category=${category}`;

    const fetchPizzas = async () => {
        const categoryUrl = category > 0 ? `${request}&` : '?';
        const sortBy = sortType.replace('-', '');
        // sort asc or desc
        const sortAD = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';
        dispatch(
            fetchItemsPizza({
                categoryUrl,
                sortBy,
                sortAD,
                currentPage: currentPage.toString(),
                search,
            }),
        );

        window.scroll(0, 0);
    };

    // Проверка нужно ли вшивать параметры в URL
    React.useEffect(() => {
        if (isMounted.current) {
            const queryStr = qs.stringify({
                sortName: sortType,
                category,
                currentPage,
            });
            navigate(`?${queryStr}`);
        }
    }, [category, sortType, currentPage]);
    // deps[] используется для того, чтобы отслеживать изменения в компонентах и заново выполнять ту функцию которая
    // находиться внутри useEffect, если deps оставить пустым это значит что нужно запустить данный код только
    // единожды при первой загрузке

    // Если был первый рендер, то отправляем запрос
    React.useEffect(() => {
        fetchPizzas();
    }, [category, sortType, searchValue, currentPage]);

    // Если был первый рендер, то проверяем URL параметры и сохраняем в redux
    React.useEffect(() => {
        if (window.location.search) {
            // получаем параметры запроса без первого символа "?"
            const params = qs.parse(
                window.location.search.substring(1) as unknown,
            ) as fetchPizzaArgs;

            // в данном случае, нужно называть переменную также, как и в state redux, чтобы передавать в нее параметры
            const sortProp = list.find((obj) => obj.sortName === params.sortBy);

            // Передаем полученные параметры в redux
            dispatch(
                setFilters({
                    searchValue: params.search,
                    category: Number(params.categoryUrl),
                    currentPage: Number(params.currentPage),
                    // чтобы избежать получения неизвестного (undefined) параметра
                    sortProp: sortProp || list[0],
                }),
            );
            isMounted.current = true;
        }
    }, []);

    // Если будут перерисовки других компонентов и у тебя не изменились props, то не производи перерисовку
    const onChangeCategory = React.useCallback((index: number) => {
        dispatch(setCategory(index));
    }, []);

    // Делается для того чтобы при первой загрузке сразу отображалось как минимум 6
    // элементов skeleton, так же чтобы при первой загрузке контент не прыгал
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    const pizza = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
        })
        .map((obj) => {
            // @ts-ignore
            return <PizzaItem key={obj.id} {...obj} />;
        });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content__top}>
                    {/*
                     чтобы передать параметры, нужно все state из дочерних компонентов перенести в родительский, и
                     далее передать эти параметры в качестве пропсов, в свою очередь пропсы должны взять
                     значения из дочерних компонентов и передать их в родительский state 
                     */}
                    {/*функция говорит что нужно взять index*/}
                    <Categories value={category} onChangeCategory={onChangeCategory} />
                    <Sort value={sortProp} />
                </div>
                <h2 className={styles.content__title}>Все пиццы</h2>
                {status === 'error' ? (
                    <div>
                        <h2>Произошла ошибка</h2>
                        <p>Попробуете перезагрузить страницу</p>
                    </div>
                ) : (
                    <div className={styles.content__items}>
                        {status === 'loading' ? skeleton : pizza}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    onChangePage={(page: number) => dispatch(setCurrentPage(page))}
                />
            </div>
        </>
    );
};
export default Home;
