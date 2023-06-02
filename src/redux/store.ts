import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import fetchPizzaSlice from './slices/fetchPizzaSlice';

export const store = configureStore({
    // Reducer принимает состояния и возвращает следующее состояние
    // Dispatch отравляет действие диспетчеру и изменить состояние
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
        pizzas: fetchPizzaSlice,
    },
});

// чтобы не прописывать в каждом компоненте тип,
// нужно его прописать единажды здесь и применять
// или {переменные из useSelector} = useSelector((state: RootState) => state.cart)
export type RootState = ReturnType<typeof store.getState>;
// К примеру const dispatch: AppDispatch = useDispatch();
export type AppDispatch = typeof store.dispatch;
