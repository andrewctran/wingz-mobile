import rideRequestsReducer, { setRideRequests, updateRideRequestStatus, setDriverLocation } from '../../src/redux/slices/rideRequestsSlice';
import { mockRideRequests } from '../__mocks__/mockRideRequests';

const initialState = {
  requests: [],
  closestRequestId: null,
  driverLocation: null,
};

describe('rideRequests slice', () => {
  it('should handle initial state', () => {
    expect(rideRequestsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setRideRequests', () => {
    const actual = rideRequestsReducer(initialState, setRideRequests(mockRideRequests));
    expect(actual.requests).toEqual(mockRideRequests);
  });

  it('should handle updateRideRequestStatus', () => {
    const modifiedRequests = [...mockRideRequests];
    modifiedRequests[0].status = 'accepted';

    const stateWithRequests = rideRequestsReducer(initialState, setRideRequests(mockRideRequests));
    const actual = rideRequestsReducer(stateWithRequests, updateRideRequestStatus({ id: '1', status: 'accepted' }));
    expect(actual.requests[0].status).toEqual('accepted');
  });

  it('should handle setDriverLocation and update closestRequestId', () => {
    const stateWithRequests = rideRequestsReducer(initialState, setRideRequests(mockRideRequests));
    const actual = rideRequestsReducer(stateWithRequests, setDriverLocation({ latitude: 37.78825, longitude: -122.4324 }));
    expect(actual.driverLocation).toEqual({ latitude: 37.78825, longitude: -122.4324 });
    expect(actual.closestRequestId).toEqual('1');
  });

  it('should handle removing declined request', () => {
    const stateWithRequests = rideRequestsReducer(initialState, setRideRequests(mockRideRequests));
    const actual = rideRequestsReducer(stateWithRequests, updateRideRequestStatus({ id: '1', status: 'declined' }));
    expect(actual.requests.length).toEqual(1);
    expect(actual.requests.find((req) => req.id === '1')).toBeUndefined();
  });
});
