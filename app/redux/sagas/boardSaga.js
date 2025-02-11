import axios from "axios";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  BOARD_STATUS_REQUEST,
  BOARD_STATUS_SUCCESS,
  BOARD_STATUS_FAILURE,
} from "../types";

//Board Detial
function boardDetailAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const studentId = payload.studentId;

  console.log(payload);
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/${studentId}`
  );
}

function* boardDetail(action) {
  try {
    const result = yield call(boardDetailAPI, action.payload);
    console.log(result);
    yield put({
      type: BOARD_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_DETAIL_FAILURE,
      payload: e.response,
    });
  }
}

//BoardNew
function boardWriteAPI(payload) {
  const categoryName = payload.categoryName;

  console.log(payload);

  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}`,
    payload
  );
}

function* boardWrite(action) {
  try {
    const result = yield call(boardWriteAPI, action.payload);

    console.log(result);
    yield put({
      type: BOARD_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_WRITE_FAILURE,
      payload: e.response,
    });
  }
}

//Board Status
function boardStatusAPI(payload) {
  const categoryName = payload.categoryName;
  const num = payload.num;
  const body = {
    status: payload.status,
  };
  return axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${categoryName}/${num}/status`,
    body
  );
}

function* boardStatus(action) {
  try {
    const result = yield call(boardStatusAPI, action.payload);

    yield put({
      type: BOARD_STATUS_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BOARD_STATUS_FAILURE,
      payload: e.response,
    });
  }
}

function* watchBoardWrite() {
  yield takeEvery(BOARD_WRITE_REQUEST, boardWrite);
}

function* watchBoardDetail() {
  yield takeEvery(BOARD_DETAIL_REQUEST, boardDetail);
}

function* watchBoardStatus() {
  yield takeEvery(BOARD_STATUS_REQUEST, boardStatus);
}

//boardSaga() 여러 Saga 통합
export default function* boardSaga() {
  yield all([
    fork(watchBoardWrite),
    fork(watchBoardDetail),
    fork(watchBoardStatus),
  ]);
}
