import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchItemsPizza = createAsyncThunk('pizzas/fetchItems', async (params) => {
    const { currentPage, categoryUrl, sortBy, sortAD, searchValue } = params;
    const { data } = await axios.get(
        `https://6458b2368badff578ef810ab.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrl}sortBy=${sortBy}&order=${sortAD}${searchValue}`,
    );
    return data;
});

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
};

const fetchPizzaSlice = createSlice({
    name: 'fetchPizza',
    initialState,
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
