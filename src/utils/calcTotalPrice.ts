// Эта папка создается для того чтобы, хранить в себе вспомогательные функции

import { Items } from '../redux/cart/types.ts';

// Для CartSlice
export const calcTotalPrice = (items: Items[]) => {
    return items.reduce((sum, obj) => {
        // + sum нужно чтобы, вернуть предыдущую сумму
        return obj.price * obj.count + sum;
    }, 0);
};
