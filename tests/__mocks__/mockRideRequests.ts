import { Ride } from '../../src/types/Ride';

export const mockRideRequests: Ride[] = [
  {
    id: '1',
    userId: 'u1',
    driverId: null,
    pickupLocation: { latitude: 37.78825, longitude: -122.4324 },
    destination: { latitude: 37.75825, longitude: -122.4624 },
    status: 'pending',
    pickupTime: null,
  },
  {
    id: '2',
    userId: 'u2',
    driverId: null,
    pickupLocation: { latitude: 37.7749, longitude: -122.4194 },
    destination: { latitude: 37.7799, longitude: -122.4294 },
    status: 'pending',
    pickupTime: null,
  },
];
