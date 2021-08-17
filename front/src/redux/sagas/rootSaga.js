import { takeLatest } from 'redux-saga/effects';
import { handleGetComment } from './handlers/comment';
import { GET_COMMENT } from '../ducks/comment';

export function* watcherSaga() {
  yield takeLatest(GET_COMMENT, handleGetComment);
  // if the previous requests hasn't done yet, cancel the previous ones and take latest request
}
