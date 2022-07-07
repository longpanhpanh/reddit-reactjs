import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    authenticationToken: null,
    refreshToken: null,
    expiresAt: null,
  },

  reducers: {
    logout: () => ({}),

    login: (state, action) => {
      state.username = action.payload.username;
      state.authenticationToken = action.payload.authenticationToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresAt = action.payload.expiresAt;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
