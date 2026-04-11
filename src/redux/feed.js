import { createSlice, current } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,
    loading: true,
    error: false,
    page: 1,
    hasMore: true,
  },
  reducers: {
    addFeed: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeFeed: (state, action) => {
      return {
        ...state,
        feed: state.feed.filter((r) => r._id !== action.payload),
      };
    },
    incrementPage: (state, action) => {
      state.page += 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { addFeed, removeFeed, incrementPage, setHasMore } =
  feedSlice.actions;

export default feedSlice.reducer;
