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
} = usersSlice.actions;
