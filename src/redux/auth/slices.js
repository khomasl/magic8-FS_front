import { createSlice } from '@reduxjs/toolkit';

import {
  register,
  logIn,
  logout,
  fetchCurrentUser,
  googleAuth,
} from './thunks';

export const google = (state, googleAuth) => {
  state.email = googleAuth.payload.email;
  state.token = googleAuth.payload.token;
  state.avatarURL = googleAuth.payload.avatarURL;
  console.log('state from:', state.email);
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
    token: null,
    // isFetchingCurrentUser: false,
    formNotification: null,
    verify: null,
    errorCode: null,
    isLoading: false,
  },

  extraReducers: {
    [register.pending](state, action) {
      state.isLoading = true;
    },
    [register.fulfilled](state, action) {
      state.verify = action.payload;
      state.formNotification = action.payload;
      state.errorCode = null;
      state.isLoading = false;
    },
    [register.rejected](state, action) {
      state.errorCode = action.payload;
      state.isLoading = false;
    },

    [logIn.pending](state, action) {
      state.isLoading = true;
    },

    [logIn.fulfilled](state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoading = false;
      state.errorCode = null;
    },
    [logIn.rejected](state, action) {
      state.errorCode = action.payload;
      state.isLoading = false;
    },

    [logout.pending](state, action) {
      state.isLoading = true;
    },

    [logout.fulfilled](state, action) {
      state.email = null;
      state.token = null;
      state.isLoading = false;
      state.errorCode = null;
    },
    [logout.rejected](state, action) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },

    [fetchCurrentUser.pending](state) {
      state.isLoading = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.email = action.payload.email;
      state.isLoading = false;
      state.errorCode = null;
    },
    [fetchCurrentUser.rejected](state, action) {
      state.isLoading = false;
      state.errorCode = action.payload;
    },

    /////// extraReducer ////
    // [googleAuth.fulfilled](state, action) {
    //   console.log('state from:', state);

    //   state.email = action.payload.email;
    //   state.token = action.payload.token;
    //   state.avatarURL = action.payload.avatarURL;
    // },
  },

  /////// reducer inside createSlice /////

  // googleAuth: (state, googleAuth) => {
  //   console.log('state from:', state);

  //   state.email = googleAuth.payload.email;
  //   state.token = googleAuth.payload.token;
  //   state.avatarURL = googleAuth.payload.avatarURL;
  // },
});

// export  googleAuth = authSlice.actions;
export default authSlice.reducer;
