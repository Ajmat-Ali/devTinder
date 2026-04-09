import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    connections: null,
    loading: true,
    error: false,
  },
  reducers: {
    addConnections: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeConnection: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
