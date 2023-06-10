import { createSlice } from '@reduxjs/toolkit';
import { FetchPizzaProp, StatusName } from './types.ts';
import { fetchItemsPizza } from './asyncThunk.ts';

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
