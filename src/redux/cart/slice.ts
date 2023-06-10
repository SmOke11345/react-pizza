import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartItemsLocalStorage } from '../../utils/getCartItemLocalStorage.ts';
import { calcTotalPrice } from '../../utils/calcTotalPrice.ts';
import { CartItemProp, Items } from './types.ts';

// Получаем значения из функции
const { cartItems, totalPrice } = getCartItemsLocalStorage();

const initialState: CartItemProp = {
    cartItems,
    totalPrice,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Items>) {
            // Ищем есть ли такой похожий объект в массиве
            const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);

            // Если есть, увеличиваем его количество
            if (findItem) {
                findItem.count++;
            } else {
                // Если нет, создаем новый и отправляем данные его массив
                state.cartItems.push({ ...action.payload, count: 1 });
            }

            // Вычисляем общую сумму после добавления в корзину
            state.totalPrice = calcTotalPrice(state.cartItems);
        },
        decItems(state, action: PayloadAction<string>) {
            const findItem = state.cartItems.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);
        },
        clearCartItems(state) {
            state.cartItems = [];
            state.totalPrice = 0;
        },
    },
});
export const { addToCart, decItems, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
