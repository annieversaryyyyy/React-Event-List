import {createSlice} from "@reduxjs/toolkit";

const name = 'users';

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
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
    facebookLoginRequest(state) {
      console.log(state);
    }
  }
});

export default usersSlice;
