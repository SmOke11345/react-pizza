import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

import styles from '../../assets/scss/app.module.css';

const typesPizza = ['тонкое', 'традиционное'];

type PizzaItemProps = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
};

const PizzaItem: React.FC<PizzaItemProps> = ({ id, price, title, imageUrl, types, sizes }) => {
    const [activeSize, setActiveSize] = React.useState<number>(0);
    const [activeType, setActiveType] = React.useState<number>(0);

    // Вовсем нашем массиве ищем пиццу у которой есть такой же id
    const countItems = useSelector((state) => state.cart.cartItems.find((obj) => obj.id === id));
    const dispatch = useDispatch();

    // Добавляем объект в наш slice, c выбранными параметрами
    const addPizzaToCart = () => {
        const item = {
            id,
            title,

            // Только для того чтобы выглядело лучше :)
            count: 0,

            price,
            imageUrl,
            types: typesPizza[activeType],
            size: sizes[activeSize],
        };
        dispatch(addToCart(item));
    };

    return (
        <div className={styles['pizza-block']}>
            <Link to={`/pizza/${id}`}>
                <img className={styles['pizza-block__image']} src={imageUrl} alt="Pizza" />
            </Link>
            <h4 className={styles['pizza-block__title']}>{title}</h4>
            <div className={styles['pizza-block__selector']}>
                <ul>
                    {types.map((type, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    setActiveType(index);
                                }}
                                className={activeType === index ? `${styles.active}` : ''}>
                                {typesPizza[type]}
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    {sizes.map((size, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? `${styles.active}` : ''}>
                                {size} см.
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles['pizza-block__bottom']}>
                <div className={styles['pizza-block__price']}>от {price} ₽</div>
                <button
                    onClick={() => addPizzaToCart()}
                    className={`${styles.button} ${styles['button--outline']} ${styles['button--add']}`}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {/*Так как в массиве изначально нет ничего, нужно делать проверку, чтобы не было ошибок*/}
                    {countItems ? <i>{countItems.count}</i> : ''}
                </button>
            </div>
        </div>
    );
};

export default PizzaItem;
