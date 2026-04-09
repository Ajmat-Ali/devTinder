import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import feedSlice from "./feed";
import connectionSlice from "./connection";
import requestSlice from "./request";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connection: connectionSlice,
    request: requestSlice,
  },
});

export default appStore;
