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
  logoutRequest,
  facebookLoginRequest,
  fetchCollaboratorsSuccess,
  addCollaboratorSuccess,
  addCollaboratorFailure,
  fetchCollaboratorsFailure,
  removeCollaboratorSuccess,
  removeCollaboratorFailure,
  fetchCollaboratorsRequest,
  addCollaboratorRequest, removeCollaboratorRequest
} from "../actions/usersActions";

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


export function* fetchCollaboratorsSaga() {
  try {
    const response = yield axiosApi.get('/users/collaborators');
    yield put(fetchCollaboratorsSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(fetchCollaboratorsFailure(e.response.data));
    yield put(addNotification('Something went wrong while fetching collaborators!', 'error'));
  }
}

export function* addCollaboratorSaga({payload: userEmail}) {
  try {
    const response = yield axiosApi.put('/users/share', {userEmail});
    yield put(addCollaboratorSuccess(response.data));
    yield put(addNotification('Calendar has been shared for this user!', 'success'));
    yield put(historyPush('/collaborators'));
  } catch (e) {
    console.error(e);
    yield put(addNotification('Something went wrong while sharing calendar!', 'error'));
    yield put(addCollaboratorFailure(e.response.data));
  }
}

export function* removeCollaboratorSaga({payload: collaboratorId}) {
  try {
    const response = yield axiosApi.put('/users/unshare', {collaboratorId});
    yield put(removeCollaboratorSuccess(response.data));
    yield put(addNotification('Calendar has been unshared for this user!', 'success'));
  } catch (e) {
    console.error(e);
    yield put(addNotification('Something went wrong while unsharing!', 'error'));
    yield put(removeCollaboratorFailure(e.response.data));
  }
}

const userSagas = [
  takeEvery(registerRequest, registerUserSaga),
  takeEvery(loginRequest, loginUserSaga),
  takeEvery(facebookLoginRequest, facebookLoginSaga),
  takeEvery(logoutRequest, logoutUserSaga),

  takeEvery(fetchCollaboratorsRequest, fetchCollaboratorsSaga),
  takeEvery(addCollaboratorRequest, addCollaboratorSaga),
  takeEvery(removeCollaboratorRequest, removeCollaboratorSaga),
];

export default userSagas;
