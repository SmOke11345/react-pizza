import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export type Items = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[] | string;
    sizes: number[] | number;
    count: number;
};

export interface CartItemProp {
    cartItems: Items[];
    totalPrice: number;
}

const initialState: CartItemProp = {
    cartItems: [],
    totalPrice: 0,
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

            // Вычисляем общую сумму
            state.totalPrice = state.cartItems.reduce((sum, obj) => {
                // + sum нужно чтобы, вернуть предыдущую сумму
                return obj.price * obj.count + sum;
            }, 0);
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

// нужно для того чтобы, избавиться от повторяющегося кода
export const cartSelector = (state: RootState) => state.cart;

export const { addToCart, decItems, removeFromCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
