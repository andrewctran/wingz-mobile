import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import haversine from 'haversine';

export const selectDriverLocation = (state: RootState) => state.driver.location;
export const selectRideRequests = (state: RootState) => state.rideRequests.requests;
export const selectClosestRideRequest = createSelector(
  [selectDriverLocation, selectRideRequests],
  (driverLocation, rideRequests) => {
    if (!driverLocation || rideRequests.length === 0) {
      return null;
    }

    let closestRide = null;
    let minDistance = Infinity;

    rideRequests.forEach((request) => {
      const distance = haversine(driverLocation, request.pickupLocation);

      if (distance < minDistance) {
        closestRide = request;
        minDistance = distance;
      }
    });

    return closestRide;
  }
);