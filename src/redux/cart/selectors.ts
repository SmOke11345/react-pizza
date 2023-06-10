import { RootState } from '../store.ts';

// нужно для того чтобы, избавиться от повторяющегося кода
export const cartSelector = (state: RootState) => state.cart;
