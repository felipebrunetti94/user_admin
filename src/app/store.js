import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/dashboard/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
