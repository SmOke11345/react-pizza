// Эта папка создается для того чтобы, хранить в себе вспомогательные функции

import { calcTotalPrice } from './calcTotalPrice.ts';
import { CartItemProp, Items } from '../redux/cart/types.ts';

// Для cartSlice
export const getCartItemsLocalStorage = (): CartItemProp => {
    // Если данные есть, то получаем их значения в виде массива объектов,
    // если нет, то возвращаем пустой массив
    const cartLocalStorage = localStorage.getItem('cartItems');
    const cartItems = cartLocalStorage ? JSON.parse(cartLocalStorage as string) : [];

    // Для получения значений из функции
    return {
        cartItems: cartItems as Items[],
        // Вычисляем общую сумму после добавления в корзину и после получения из localStorage
        totalPrice: calcTotalPrice(cartItems),
    };
};
