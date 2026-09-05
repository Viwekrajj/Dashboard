import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { checkRateLimit, configureRateLimiter } from "../../api/rateLimiter";

// const API = {
//   UPDATE_CONFIGURATION: "/FixedWindow/updateConfiguration",
//   CHECK: "/FixedWindow/check",
// };

// const updateConfigurationApi = (data) => {
//   return axios.post(API.UPDATE_CONFIGURATION, data);
// };

// const checkRateLimitApi = (data) => {
//   return axios.post(API.CHECK, data);
// };

function* updateConfigurationSaga(action) {
  try {
    const response = yield call(configureRateLimiter, action.payload);

    yield put({
      type: "UPDATE_CONFIGURATION_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: "UPDATE_CONFIGURATION_FAILURE",
      payload: error.response?.data || "Failed to update configuration",
    });
  }
}

function* checkRateLimitSaga(action) {
  try {
    const response = yield call(checkRateLimit, action.payload);

    yield put({
      type: "CHECK_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: "CHECK_FAILURE",
      payload: error.response?.data || "Rate limit check failed",
    });
  }
}

export default function* rateLimiterSaga() {
  yield takeLatest(updateConfiguration.type, updateConfigurationSaga);
  yield takeLatest(checkRateLimit.type, checkRateLimitSaga);
}