import usersSlice from "../slices/usersSlice";

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  facebookLoginRequest,

  logoutRequest,
  fetchCollaboratorsRequest,
  fetchCollaboratorsSuccess,
  fetchCollaboratorsFailure,

  addCollaboratorRequest,
  addCollaboratorSuccess,
  addCollaboratorFailure,

  removeCollaboratorRequest,
  removeCollaboratorSuccess,
  removeCollaboratorFailure,
} = usersSlice.actions;
