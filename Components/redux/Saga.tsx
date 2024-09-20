import {  put, takeEvery } from "redux-saga/effects";
import {  SET_USER_DATA, USER_LIST } from "./CounterAction";

function* userList(): any {
  const url = "https://jsonplaceholder.typicode.com/posts?_limit=30";
  let data = yield fetch(url);
  data = yield data.json();
  data = data.map((element: any) => {
    if (element.id <= 15) {
      return { ...element, status: 'Approved' }
    }
    else if (element.id > 15 && element.id < 22) {
      return { ...element, status: 'InProgress' }
    } else {
      return { ...element, status: 'Closed' }
    }
  })
  yield put({ type: SET_USER_DATA, data })
}

function* SagaData() {
  yield takeEvery(USER_LIST, userList);
}

export default SagaData;