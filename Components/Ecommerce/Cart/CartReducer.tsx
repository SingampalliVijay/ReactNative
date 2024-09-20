import {REMOVE_PRODUCT_DATA, SET_PRODUCT_DATA } from "../../redux/CounterAction"

const initialState:any = {
    cartList:[]
};

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PRODUCT_DATA:
            return {
                ...state,
                cartList:action.data
            }
        case REMOVE_PRODUCT_DATA:
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
