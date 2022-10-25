import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchCollaboratorsLoading: false,
  fetchCollaboratorsError: null,
  addCollaboratorLoading: false,
  addCollaboratorError: null,
  removeCollaboratorLoading: false,
  removeCollaboratorError: null,
};

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerRequest(state) {
      state.registerLoading = true;
      state.registerError = null;
    },
    registerSuccess(state, action) {
      state.registerLoading = false;
      state.user = action.payload;
    },
    registerFailure(state, action) {
      state.registerLoading = false;
      state.registerError = action.payload;
    },
    loginRequest(state) {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.loginLoading = false;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logoutRequest(state) {
      state.user = null;
    },
    facebookLoginRequest() {},
    fetchCollaboratorsRequest(state) {
      state.fetchCollaboratorsLoading = true;
      state.fetchCollaboratorsError = null;
    },
    fetchCollaboratorsSuccess(state, action) {
      state.fetchCollaboratorsLoading = false
      state.collaborators = action.payload;
    },
    fetchCollaboratorsFailure(state, action) {
      state.fetchCollaboratorsLoading = false;
      state.fetchCollaboratorsError = action.payload;
    },
    addCollaboratorRequest(state) {
      state.addCollaboratorLoading = true;
      state.addCollaboratorError = null;
    },
    addCollaboratorSuccess(state) {
      state.addCollaboratorLoading = false;
    },
    addCollaboratorFailure(state, action) {
      state.addCollaboratorLoading = false;
      state.addCollaboratorError = action.payload;
    },
    removeCollaboratorRequest(state) {
      state.removeCollaboratorLoading = true;
      state.removeCollaboratorError = null;
    },
    removeCollaboratorSuccess(state, {payload: deletedCollaborator}) {
      state.removeCollaboratorLoading = false;
      state.collaborators = state.collaborators.filter(item => item._id !== deletedCollaborator._id);
    },
    removeCollaboratorFailure(state, action) {
      state.removeCollaboratorLoading = false;
      state.removeCollaboratorError = action.payload;
    },
  }
});

export default usersSlice;
