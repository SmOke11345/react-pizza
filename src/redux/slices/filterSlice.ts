import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type SortProp = {
    name: string;
    sortName: SortEnum;
};

export interface FilterSliceProp {
    searchValue: string;
    category: number;
    currentPage: number;
    sortProp: SortProp;
}

const initialState: FilterSliceProp = {
    searchValue: '',
    category: 0,
    currentPage: 1,
    // можно сказать что это как бы стандартное значение, но в дальнейшем в этот объект будут добавляться новые
    sortProp: {
        name: 'популярности (↓)',
        sortName: SortEnum.RATING_DESC,
    },
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // action используется для передачи значений
        setCategory(state, action: PayloadAction<number>) {
            state.category = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<SortProp>) {
            state.sortProp = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceProp>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.category = Number(action.payload.category);
                state.sortProp = action.payload.sortProp;
            } else {
                state.currentPage = 1;
                state.category = 0;
                state.sortProp = {
                    name: 'популярности (↓)',
                    sortName: SortEnum.RATING_DESC,
                };
            }
        },
    },
});
// все методы хранятся в actions
export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
