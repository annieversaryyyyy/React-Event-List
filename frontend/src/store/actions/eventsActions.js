import eventsSlice from "../slices/eventsSlice";

export const {
  createRequest,
  createSuccess,
  createFailure,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
  updateEventRequest,
  updateEventSuccess,
  updateEventFailure,
  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
} = eventsSlice.actions;
