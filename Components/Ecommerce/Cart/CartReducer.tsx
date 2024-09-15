import {SET_PRODUCT_DATA } from "../../redux/CounterAction"

const initialState = {
    cartList:[]
};

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PRODUCT_DATA:
            return {
                ...state,
                cartList:action.data
            }
        default:
            return {
                state
            }
    }
};
