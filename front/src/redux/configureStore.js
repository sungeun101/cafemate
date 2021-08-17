import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import commentReducer from './ducks/comment';
import { watcherSaga } from './sagas/rootSaga';

const reducer = combineReducers({
  comment: commentReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
