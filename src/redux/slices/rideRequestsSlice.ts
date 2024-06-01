import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ride } from '../../types/Ride';
import haversine from 'haversine';

interface RideRequestsState {
  requests: Ride[];
  closestRequestId: string | null;
  driverLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

const initialState: RideRequestsState = {
  requests: [],
  closestRequestId: null,
  driverLocation: null,
};

const rideRequestsSlice = createSlice({
  name: 'rideRequests',
  initialState,
  reducers: {
    setRideRequests(state, action: PayloadAction<Ride[]>) {
      state.requests = action.payload;
      rideRequestsSlice.caseReducers.updateClosestRequest(state);
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
    setDriverLocation(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.driverLocation = action.payload;
      rideRequestsSlice.caseReducers.updateClosestRequest(state);
    },
    updateClosestRequest(state) {
      if (state.driverLocation && state.requests.length > 0) {
        let minDistance = Infinity;
        let closestRequest = null;

        state.requests.forEach((request) => {
          const distance = haversine(state.driverLocation, request.pickupLocation);
          if (distance < minDistance) {
            minDistance = distance;
            closestRequest = request.id;
          }
        });

        state.closestRequestId = closestRequest;
      }
    }
  },
});

export const { setRideRequests, updateRideRequestStatus, setDriverLocation } = rideRequestsSlice.actions;
export default rideRequestsSlice.reducer;
