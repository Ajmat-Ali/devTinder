import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

const appStore = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default appStore;
