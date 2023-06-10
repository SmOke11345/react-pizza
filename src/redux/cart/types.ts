export type Items = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[] | string;
    sizes: number[] | number;
    count: number;
};

export interface CartItemProp {
    cartItems: Items[];
    totalPrice: number;
}
