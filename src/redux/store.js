import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';

export const store = configureStore({
    // Reducer принимает состояния и возвращает следующее состояние
    // Dispatch отравляет действие диспетчеру и изменить состояние
    reducer: {
        filter: filterReducer,
    },
});
