import { selectDriverLocation, selectRideRequests, selectClosestRideRequest } from '../../src/redux/selectors';
import { RootState } from '../../src/redux/store';
import { mockRideRequests } from '../__mocks__/mockRideRequests';

describe('selectors', () => {
  const initialState: RootState = {
    driver: {
      location: { latitude: 37.78825, longitude: -122.4324 },
    },
    rideRequests: {
      requests: mockRideRequests,
    },
  };

  it('should select the driver location', () => {
    const selected = selectDriverLocation(initialState);
    expect(selected).toEqual({ latitude: 37.78825, longitude: -122.4324 });
  });

  it('should select the ride requests', () => {
    const selected = selectRideRequests(initialState);
    expect(selected).toEqual(mockRideRequests);
  });

  it('should select the closest request ID', () => {
    const selected = selectClosestRideRequest(initialState);
    expect(selected.id).toEqual('1');
  });
});
