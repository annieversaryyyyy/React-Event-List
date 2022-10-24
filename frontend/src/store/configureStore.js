import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

// SLices
import usersSlice from "./slices/usersSlice";
import eventsSlice from "./slices/eventsSlice";

// Other
import axiosApi from "../axiosApi";
import rootSagas from "./rootSagas";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  events: eventsSlice.reducer
});

const persistedState = loadFromLocalStorage();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  thunk,
  sagaMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
  preloadedState: persistedState,
});

sagaMiddleware.run(rootSagas);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user,
    }
  })
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch (e) {}

  return config;
});

axiosApi.interceptors.response.use(res => res, e => {
  if (!e.response.data) {
    e.response = {data: {global: 'No internet!'}};
  }

  throw e;
});

export default store;