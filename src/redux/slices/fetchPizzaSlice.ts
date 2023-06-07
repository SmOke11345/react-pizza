import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Items } from './cartSlice.ts';

// Используется для краткости написания кода,
// к примеру когда все параметры string (и первое значение number Record<string, string> & {currentPage: number })

export type fetchPizzaArgs = {
    currentPage: string;
    categoryUrl: string;
    sortBy: string;
    sortAD: string;
    search: string;
};

// Используется для создания динамического свойства (в этом примере)
// Теперь если мы захотим поменять значение, мы меняем его в enum и оно меняется везде где используется
export enum StatusName {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface FetchPizzaProp {
    items: Items[];
    status: StatusName;
}

export const fetchItemsPizza = createAsyncThunk<Items[], fetchPizzaArgs>(
    'pizzas/fetchItems',
    async (params) => {
        const { currentPage, categoryUrl, sortBy, sortAD, search } = params;
        const { data } = await axios.get(
            `https://6458b2368badff578ef810ab.mockapi.io/items?page=${currentPage}&limit=6&${categoryUrl}sortBy=${sortBy}&order=${sortAD}${search}`,
        );

        return data;
    },
);

const initialState: FetchPizzaProp = {
    items: [],
    status: StatusName.LOADING, // loading | success | error
};

const fetchPizzaSlice = createSlice({
    name: 'fetchPizza',
    initialState,
    reducers: {},
    // Нужен для дополнительных функций (Большая гибкость)
    extraReducers: (builder) => {
        builder.addCase(fetchItemsPizza.pending, (state) => {
            state.status = StatusName.LOADING;
            // Для отчистки старых элементов после изменения параметров фильтрации
            state.items = [];
        });
        builder.addCase(fetchItemsPizza.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = StatusName.SUCCESS;
        });
        builder.addCase(fetchItemsPizza.rejected, (state) => {
            state.status = StatusName.ERROR;
            state.items = [];
        });
        //         // Загрузка
        //         [fetchItemsPizza.pending]: (state) => {
        //         state.status = 'loading';
        //         // Для отчистки старых элементов после изменения параметров фильтрации
        //         state.items = [];
        //     },
        //         // Все нормально
        //         [fetchItemsPizza.fulfilled]: (state, action) => {
        //         state.items = action.payload;
        //         state.status = 'success';
        //     },
        //         // Если произошла ошибка
        //         [fetchItemsPizza.rejected]: (state) => {
        //         state.status = 'error';
        //         state.items = [];
        //     },
    },
});

// export const { setItemsPizza } = fetchPizzaSlice.actions;

export default fetchPizzaSlice.reducer;
