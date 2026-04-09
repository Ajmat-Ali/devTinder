import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: null,
    loading: true,
    error: false,
  },
  reducers: {
    addRequests: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeRequest: (state, action) => {
      return {
        ...state,
        requests: state.requests.filter((r) => r._id !== action.payload._id),
      };
    },
  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequest } = requestSlice.actions;
