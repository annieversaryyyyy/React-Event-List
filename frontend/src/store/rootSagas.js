import {all} from 'redux-saga/effects';
import userSagas from "./sagas/usersSagas";
import eventsSagas from "./sagas/eventsSagas";

export default function* rootSagas(){
  yield all([
    ...userSagas,
    ...eventsSagas
  ])
}