import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
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
        decItems(state, action) {
            const findItem = state.cartItems.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeFromCart(state, action) {
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
