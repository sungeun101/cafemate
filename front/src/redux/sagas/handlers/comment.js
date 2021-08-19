import { call, put } from 'redux-saga/effects';
import { setComment } from '../../ducks/comment';
import { requestGetComment } from '../requests/comment';

export function* handleGetComment(action) {
  try {
    const response = yield call(requestGetComment);
    // Handler calls a function to make the Request
    const { data } = response;
    yield put(setComment(data)); // dispatch this action
  } catch (error) {
    console.log(error);
  }
}
// When action dispatched, WatcherSaga catches the action and handler calls getComment(request - api call)
// this will return response data -> setComment
