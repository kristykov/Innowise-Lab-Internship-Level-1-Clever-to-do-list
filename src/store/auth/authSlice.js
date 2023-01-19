import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userId: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        isAuthenticated: true,
      };
    },
    logout(state) {
      return {
        ...state,
        userId: "",
        isAuthenticated: false,
      };
    },
  },
});

export const isAuthenticated = (state) => state.auth.isAuthenticated;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
