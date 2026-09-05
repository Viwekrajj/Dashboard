import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import FixedWindowSaga from './RateLimiterSaga/FixedWindowSaga';


export default function* rootSaga() {
  yield all([fork(
    authSaga,
    FixedWindowSaga
  )]);
}
