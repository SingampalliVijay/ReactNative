import {configureStore} from '@reduxjs/toolkit'
import {counterReducer} from './CounterReducer'
import createSagaMiddleWare from 'redux-saga';
import SagaData from './Saga';
import { reducer } from './reducer';
import {CartReducer} from '../Ecommerce/Cart/CartReducer';
import CartSaga from '../Ecommerce/Cart/CartSaga';

const sagaMiddleWare =createSagaMiddleWare();
const store =configureStore({
    reducer: {
        counter: counterReducer,
        data:reducer,
        cart:CartReducer
    },
    middleware:(gDM)=>gDM({
        serializableCheck:false,
        immutableCheck:false,
        thunk:false
    }).concat(sagaMiddleWare)
});
sagaMiddleWare.run(SagaData);
sagaMiddleWare.run(CartSaga)
export default store;

