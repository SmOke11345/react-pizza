import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ItemsType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    count: number;
};

interface FetchPizzaProp {
    items: ItemsType[];
    status: 'loading' | 'success' | 'error';
}

export const fetchItemsPizza = createAsyncThunk('pizzas/fetchItems', async (params, thunkApi) => {
    const { currentPage, categoryUrl, sortBy, sortAD, searchValue } = params;
    const { data } = await axios.get(
        `https://6458b2368badff578ef810ab.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrl}sortBy=${sortBy}&order=${sortAD}${searchValue}`,
    );

    return data;
});

const initialState: FetchPizzaProp = {
    items: [],
    status: 'loading', // loading | success | error
};

const fetchPizzaSlice = createSlice({
    name: 'fetchPizza',
    initialState,
    reducers: {},
    // Нужен для дополнительных функций (Большая гибкость)
    extraReducers: {
        // Загрузка
        [fetchItemsPizza.pending]: (state) => {
            state.status = 'loading';
            // Для отчистки старых элементов после изменения параметров фильтрации
            state.items = [];
        },
        // Все нормально
        [fetchItemsPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        // Если произошла ошибка
        [fetchItemsPizza.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

// export const { setItemsPizza } = fetchPizzaSlice.actions;

export default fetchPizzaSlice.reducer;
