import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';

export const store = configureStore({
    // Reducer принимает состояния и возвращает следующее состояние
    reducer: {
        filter: filterReducer,
    },
    // Dispatch отравляет действие диспетчеру и изменить состояние
});
