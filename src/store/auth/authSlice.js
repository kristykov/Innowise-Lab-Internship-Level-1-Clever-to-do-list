import { createSlice } from "@reduxjs/toolkit";

const uId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : null;

const initialAuthState = {
  userId: uId,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => ({
      ...state,
      userId: action.payload,
      isAuthenticated: true,
    }),
    logout(state) {
      return {
        ...state,
        userId: null,
        isAuthenticated: false,
      };
    },
  },
});

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const userIdSelector = (state) => state.auth.userId;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
