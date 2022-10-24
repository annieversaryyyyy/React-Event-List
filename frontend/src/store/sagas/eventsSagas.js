import {select, put, takeEvery} from "redux-saga/effects";

// Actions
import {addNotification} from "../actions/notifierActions";
import {historyPush} from "../actions/historyActions";
import {
  createRequest,
  createSuccess,
  createFailure,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
} from "../actions/eventsActions";

// Other
import axiosApi from "../../axiosApi";

export function* createEventSaga({payload: eventData}) {
  try {
    const token = select(state => state.users.user.token);
    const headers = {'Authorization': token};

    const response = yield axiosApi.post('/events', eventData, {headers});

    yield put(createSuccess(response.data));
    yield put(addNotification('Successfully created new event!', 'success'));
    yield put(historyPush('/'));
  } catch (e) {
    console.error(e);
    yield put(createFailure(e.response.data));
    yield put(addNotification('Something went wrong while creating the event!', 'error'));
  }
}

export function* fetchEventsSaga() {
  try {
    const response = yield axiosApi.get('/events');
    yield put(fetchSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(fetchFailure(e.response.data));
    yield put(addNotification('something went wrong while fetching events!', 'error'));
  }
}

const eventsSagas = [
  takeEvery(createRequest, createEventSaga),
  takeEvery(fetchRequest, fetchEventsSaga),
];

export default eventsSagas;
