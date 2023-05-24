import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sortProp = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sortProp = action.payload.sortProp;
            state.currentPage = Number(action.payload.currentPage);
            state.category = Number(action.payload.category);
        },
    },
});
// все методы хранятся в actions
export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
