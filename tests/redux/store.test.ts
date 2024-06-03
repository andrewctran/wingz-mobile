import { configureStore } from '@reduxjs/toolkit';
import driverReducer, { setDriverLocation } from '../../src/redux/slices/driverSlice';
import rideRequestsReducer, { setRideRequests, updateRideRequestStatus, setDriverLocation as setRideRequestsDriverLocation } from '../../src/redux/slices/rideRequestsSlice';
import { mockRideRequests } from '../__mocks__/mockRideRequests';

describe('store', () => {
  const store = configureStore({
    reducer: {
      driver: driverReducer,
      rideRequests: rideRequestsReducer,
    },
  });

  it('should handle initial state', () => {
    const state = store.getState();
    expect(state.driver.location).toBeNull();
    expect(state.rideRequests.requests).toEqual([]);
  });

  it('should handle setDriverLocation for driver slice', () => {
    const location = { latitude: 37.78825, longitude: -122.4324 };
    store.dispatch(setDriverLocation(location));
    const state = store.getState();
    expect(state.driver.location).toEqual(location);
  });

  it('should handle setRideRequests', () => {
    store.dispatch(setRideRequests(mockRideRequests));
    const state = store.getState();
    expect(state.rideRequests.requests).toEqual(mockRideRequests);
  });

  it('should handle updateRideRequestStatus', () => {
    store.dispatch(setRideRequests(mockRideRequests));
    store.dispatch(updateRideRequestStatus({ id: '1', status: 'accepted' }));
    const state = store.getState();
    expect(state.rideRequests.requests.find(req => req.id === '1')?.status).toEqual('accepted');
  });

  it('should handle removing declined request', () => {
    store.dispatch(setRideRequests(mockRideRequests));
    store.dispatch(updateRideRequestStatus({ id: '1', status: 'declined' }));
    const state = store.getState();
    expect(state.rideRequests.requests.length).toEqual(1);
    expect(state.rideRequests.requests.find((req) => req.id === '1')).toBeUndefined();
  });
});
