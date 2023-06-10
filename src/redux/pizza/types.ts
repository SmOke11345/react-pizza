import { Items } from '../cart/types.ts';

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

export interface FetchPizzaProp {
    items: Items[];
    status: StatusName;
}
