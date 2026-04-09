import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: false,
  },
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    // updateUser: (state, action) => {
    //   state.user = { ...state.user, ...action.payload };
    // },
    removeUser: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
