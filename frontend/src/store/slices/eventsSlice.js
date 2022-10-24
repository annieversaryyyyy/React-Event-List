import {createSlice} from "@reduxjs/toolkit";

const name = 'events';

export const initialState = {
  events: [],
  createLoading: false,
  createError: null,
  fetchLoading: false,
  fetchError: null
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
  }
});

export default eventsSlice;















