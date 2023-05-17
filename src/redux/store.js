import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    // Reducer принимает состояния и возвращает следующее состояние
    // Dispatch отравляет действие диспетчеру и изменить состояние
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
    },
});
