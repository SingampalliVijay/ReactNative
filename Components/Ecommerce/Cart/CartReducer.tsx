import { REMOVE_FROM_CART, SET_PRODUCT_DATA } from "../../redux/CounterAction"

const initialState: any[] = [];

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PRODUCT_DATA:
            const cartItem = state.findIndex(item => item.id === action.data.id);
            if (cartItem !== -1) {
                const updatedCart = [...state];
                updatedCart[cartItem] = {
                    ...updatedCart[cartItem],
                    quantity: updatedCart[cartItem].quantity + 1,
                };
                return updatedCart;
            }
            return [...state, { ...action.data, quantity: 1 }];
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.data.id);
        default:
            return state;
    }
};
