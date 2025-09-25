import { applyMiddleware, legacy_createStore } from 'redux';
import { MovieReducer } from '../Reducer/MovieReducer';
import thunk from 'redux-thunk';

export const MyStore = legacy_createStore(MovieReducer, applyMiddleware(thunk));
