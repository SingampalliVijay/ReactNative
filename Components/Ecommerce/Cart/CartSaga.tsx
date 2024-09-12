import { put, takeEvery } from "redux-saga/effects";
import { PRODUCT_LIST, SET_PRODUCT_DATA } from "../../redux/CounterAction";

function* productsList(data:any): any {
    yield put({ type: SET_PRODUCT_DATA ,data})
}

function* CartSaga() {
    yield takeEvery(PRODUCT_LIST, productsList)
}

export default CartSaga;
