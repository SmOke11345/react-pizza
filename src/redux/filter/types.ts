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
