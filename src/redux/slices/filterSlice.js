import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 0,
    currentPage: 1,
    // можно сказать что это как бы стандартное значение, но в дальнейшем в этот объект будут добавляться новые
    sortProp: {
        name: 'популярности (↓)',
        sortName: 'rating',
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // action используется для передачи значений
        setCategory(state, action) {
            state.category = action.payload;
        },
        setSort(state, action) {
            state.sortProp = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});
// все методы хранятся в actions
export const { setCategory, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
