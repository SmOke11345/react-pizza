import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filter/slice.ts';
import cartReducer from './cart/slice.ts';
import fetchPizzaReducer from './pizza/slice.ts';

export const store = configureStore({
    // Reducer принимает состояния и возвращает следующее состояние
    // Dispatch отравляет действие диспетчеру и изменить состояние
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzas: fetchPizzaReducer,
    },
});

// чтобы не прописывать в каждом компоненте тип,
// нужно его прописать единожды здесь и применять
// или {переменные из useSelector} = useSelector((state: RootState) => state.cart)
export type RootState = ReturnType<typeof store.getState>;
// К примеру const dispatch: AppDispatch = useDispatch();
export type AppDispatch = typeof store.dispatch;
