// import { PRODUCT_LIST, USER_LIST } from "./constants";

export const Increment = () => {
  return {
    type: 'INCREMENT',
  };
};
export const Decrement = () => {
  return {
    type: 'DECREMENT',
  };
};
export const Reset = () => {
  return {
    type: 'RESET',
  };
};

export function getUserList() {
  return {
    type: USER_LIST
  }
}

export function getProductList() {
  return {
    type: SET_PRODUCT_DATA
  }
}

export const USER_LIST ="user_list";
export const SET_USER_DATA="set_user_data";
export const SET_PRODUCT_DATA="set_product_data"
export const PRODUCT_LIST="product_list";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
