import eventsSlice from "../slices/eventsSlice";


export const {
  createRequest,
  createSuccess,
  createFailure,
  fetchRequest,
  fetchSuccess,
  fetchFailure
} = eventsSlice.actions;
