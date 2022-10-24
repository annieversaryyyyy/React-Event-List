import {select, put, takeEvery} from "redux-saga/effects";

// Actions
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest, facebookLoginRequest
} from "../actions/usersActions";

// Ohter
import axiosApi from "../../axiosApi";

export function* registerUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users', userData);

    yield put(registerSuccess(response.data));
    yield put(addNotification('Register successful!', 'success'));
    yield put(historyPush('/'));
  } catch (e) {
    console.error(e);
    yield put(registerFailure(e.response.data));
    yield put(addNotification('Something went wrong during register!', 'error'));
  }
}

export function* loginUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);

    yield put(loginSuccess(response.data.user));
    yield put(addNotification('Successfully logged in!', 'success'));
    yield put(historyPush('/'));
  } catch (e) {
    console.error(e);
    if (e.response && e.response.data) {
      yield put(loginFailure(e.response.data));
    } else {
      yield put(loginFailure({global: 'No internet'}));
    }
    yield put(addNotification('Something went wrong during login!', 'error'));
  }
}

export function* logoutUserSaga() {
  try {
    const token = select(state => state.users.user.token);
    const headers = {'Authorization': token};

    yield axiosApi.delete('/users/sessions', {headers});
    yield put(addNotification('Successfully logged out!', 'success'));
    yield put(historyPush('/'));
  } catch (e) {
    console.error(e);
    yield put(addNotification('Something went wrong during logout!', 'error'));
  }
}


export function* facebookLoginSaga({payload: data}) {
  try {
    const response = yield axiosApi.post('/users/facebookLogin', data);
    yield put(addNotification('Successfully logged in via Facebook!', 'success'));
    yield put(loginSuccess(response.data.user));
    yield put(historyPush('/'));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

const userSagas = [
  takeEvery(registerRequest, registerUserSaga),
  takeEvery(loginRequest, loginUserSaga),
  takeEvery(facebookLoginRequest, facebookLoginSaga),
  takeEvery(logoutRequest, logoutUserSaga),
];

export default userSagas;
