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
  deleteFailure,
  deleteSuccess,
  deleteRequest,
  fetchEventSuccess,
  fetchEventFailure, fetchEventRequest, updateEventRequest, updateEventSuccess, updateEventFailure,
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


export function* deleteEventSaga({payload: eventId}) {
  try {
    const response = yield axiosApi.delete(`/events/delete/${eventId}`);
    yield put(deleteSuccess(response.data));
    yield put(historyPush('/'));
  } catch (e) {
    console.error(e);
    yield put(deleteFailure(e.response.data));
    yield put(addNotification('something went wrong while deleting event!', 'error'));
  }
}

export function* updateEventSaga({payload: eventData}) {
  try {
    const response = yield axiosApi.put(`/events/update/${eventData._id}`, {...eventData});
    yield put(updateEventSuccess(response.data));
    yield put(addNotification('Successfully updated event!', 'success'));
    yield put(historyPush(`/`));
  } catch (e) {
    console.error(e);
    yield put(updateEventFailure(e.response.data));
    yield put(addNotification('something went wrong while updating event!', 'error'));
  }
}

export function* fetchEventSaga({payload: eventId}) {
  try {
    const response = yield axiosApi.get(`/events/${eventId}`);
    yield put(fetchEventSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(fetchEventFailure(e.response.data));
    yield put(addNotification('Something went wrong while fetching event!', 'error'));
  }
}

const eventsSagas = [
  takeEvery(createRequest, createEventSaga),
  takeEvery(fetchRequest, fetchEventsSaga),
  takeEvery(deleteRequest, deleteEventSaga),
  takeEvery(updateEventRequest, updateEventSaga),
  takeEvery(fetchEventRequest, fetchEventSaga),
];

export default eventsSagas;
