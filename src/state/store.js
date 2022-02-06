import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
