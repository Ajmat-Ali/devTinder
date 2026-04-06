import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

const appStore = configureStore({
  reducer: {
    name: userSlice,
  },
});

export default appStore;
