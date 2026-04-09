import { createSlice, current } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    loading: true,
    error: false,
  },
  reducers: {
    addFeed: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addFeed } = feedSlice.actions;

export default feedSlice.reducer;
