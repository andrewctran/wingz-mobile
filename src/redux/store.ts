import { configureStore } from '@reduxjs/toolkit';
import driverReducer from './slices/driverSlice';
import rideRequestsReducer from './slices/rideRequestsSlice';

export const store = configureStore({
  reducer: {
    driver: driverReducer,
    rideRequests: rideRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
