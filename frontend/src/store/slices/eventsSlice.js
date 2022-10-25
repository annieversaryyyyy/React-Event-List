import {createSlice} from "@reduxjs/toolkit";

const name = 'events';

export const initialState = {
  events: [],
  event: {},
  createLoading: false,
  createError: null,
  fetchLoading: false,
  fetchError: null,
  deleteLoading: false,
  deleteError: null,
  updateEventLoading: false,
  updateEventError: null,
  fetchEventLoading: false,
  fetchEventError: null,
};

const eventsSlice = createSlice({
  name,
  initialState,
  reducers: {
    createRequest(state) {
      state.createLoading = true;
      state.createError = null;
    },
    createSuccess(state, {payload: newEvent}) {
      state.createLoading = false;
      state.events = [...state.events, newEvent];
    },
    createFailure(state, action) {
      state.createLoading = false;
      state.createError = action.payload;
    },

    fetchRequest(state) {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchSuccess(state, action) {
      state.fetchLoading = false;
      state.events = action.payload;
    },
    fetchFailure(state, action) {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },

    deleteRequest(state) {
      state.deleteLoading = true;
      state.deleteError = null;
    },
    deleteSuccess(state, {payload: deletedEvent}) {
      state.deleteLoading = false;
      state.events = state.events.filter(item => item._id !== deletedEvent._id);
    },
    deleteFailure(state, action) {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },

    updateEventRequest(state) {
      state.updateEventLoading = true;
      state.updateEventError = null;
    },
    updateEventSuccess(state, {payload: updatedEvent}) {
      state.updateEventLoading = false;
      state.event = updatedEvent;
    },
    updateEventFailure(state, action) {
      state.updateEventLoading = false;
      state.updateEventError = action.payload;
    },

    fetchEventRequest(state) {
      state.fetchEventLoading = true;
      state.fetchEventError = null;
    },
    fetchEventSuccess(state, action) {
      state.fetchEventLoading = false;
      state.event = action.payload;
    },
    fetchEventFailure(state, action) {
      state.fetchEventLoading = false;
      state.fetchEventError = action.payload;
    },
  }
});

export default eventsSlice;















