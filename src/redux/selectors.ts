import { RootState } from './store';

export const selectDriverLocation = (state: RootState) => state.rideRequests.driverLocation;
export const selectRideRequests = (state: RootState) => state.rideRequests.requests;
export const selectClosestRequestId = (state: RootState) => state.rideRequests.closestRequestId;
