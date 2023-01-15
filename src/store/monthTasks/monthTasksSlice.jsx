import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monthTasks: [],
};

export const monthTasksSlice = createSlice({
  name: "monthTasks",
  initialState,
  reducers: {
    addTasks: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.monthTasks = action.payload;
    },
  },
});

export const monthTasks = (state) => state.monthTasks.monthTasks;

export const monthTasksAction = monthTasksSlice.actions;

export default monthTasksSlice.reducer;
