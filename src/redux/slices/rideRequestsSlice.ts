import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ride } from '../../types/Ride';
import { mockRideRequests } from '../../mockRideRequests';

interface RideRequestsState {
  requests: Ride[];
}

const initialState: RideRequestsState = {
  requests: [],
};

const rideRequestsSlice = createSlice({
  name: 'rideRequests',
  initialState,
  reducers: {
    setRideRequests(state, action: PayloadAction<Ride[]>) {
      state.requests = action.payload;
    },
    updateRideRequestStatus(state, action: PayloadAction<{ id: string; status: string }>) {
      const request = state.requests.find((req) => req.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
        if (action.payload.status === 'declined') {
          state.requests = state.requests.filter((req) => req.id !== action.payload.id);
        }
      }
    },
  },
});

export const { setRideRequests, updateRideRequestStatus } = rideRequestsSlice.actions;
export default rideRequestsSlice.reducer;
