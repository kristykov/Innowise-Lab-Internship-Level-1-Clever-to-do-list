import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  activeDay: new Date().getTime(),
};

export const activeDaySlice = createSlice({
  name: "activeDay",
  initialState,
  reducers: {
    setActiveDay: (state, action) => ({
      ...state,
      activeDay: action.payload,
    }),
  },
});

export const activeDay = (state) => state.activeDay.activeDay; // selectActivatDate

export const activeDayAction = activeDaySlice.actions;

export default activeDaySlice.reducer;
