import driverReducer, { setDriverLocation } from '../../src/redux/slices/driverSlice';

const initialState = {
  location: null,
};

describe('driver slice', () => {
  it('should handle initial state', () => {
    expect(driverReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setDriverLocation', () => {
    const location = { latitude: 37.78825, longitude: -122.4324 };
    const actual = driverReducer(initialState, setDriverLocation(location));
    expect(actual.location).toEqual(location);
  });
});
