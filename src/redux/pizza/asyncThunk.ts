import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Items } from '../cart/types.ts';
import { fetchPizzaArgs } from './types.ts';

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
