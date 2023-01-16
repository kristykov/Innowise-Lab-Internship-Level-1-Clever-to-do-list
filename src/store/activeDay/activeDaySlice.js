import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDay: new Date().getTime(),
};

export const activeDaySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveDay: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeDay = action.payload;
    },
  },
});

export const activeDay = (state) => state.activeDay.activeDay; // selectActivatDate

export const activeDayAction = activeDaySlice.actions;

export default activeDaySlice.reducer;
