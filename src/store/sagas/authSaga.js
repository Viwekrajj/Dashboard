import { call, put, takeLatest } from "redux-saga/effects";

import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../slices/authSlice";

import { registerUser, loginUser } from "../api/authApi";

function* registerSaga(action) {
  try {
    const response = yield call(registerUser, action.payload);

    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(
      registerFailure(
        error.response?.data?.message || "Registration failed"
      )
    );
  }
}

function* loginSaga(action) {
  try {
    const response = yield call(loginUser, action.payload);

    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(
      loginFailure(
        error.response?.data?.message || "Login failed"
      )
    );
  }
}

export default function* authSaga() {
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(loginRequest.type, loginSaga);
}