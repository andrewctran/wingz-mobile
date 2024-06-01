import { Ride } from './types/Ride';

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
  {
    id: '3',
    userId: 'u3',
    driverId: null,
    pickupLocation: { latitude: 37.7849, longitude: -122.4094 },
    destination: { latitude: 37.7899, longitude: -122.4194 },
    status: 'pending',
    pickupTime: null,
  },
  {
    id: '4',
    userId: 'u4',
    driverId: null,
    pickupLocation: { latitude: 37.7649, longitude: -122.4294 },
    destination: { latitude: 37.7699, longitude: -122.4394 },
    status: 'pending',
    pickupTime: null,
  },
  {
    id: '5',
    userId: 'u5',
    driverId: null,
    pickupLocation: { latitude: 37.7549, longitude: -122.4494 },
    destination: { latitude: 37.7599, longitude: -122.4594 },
    status: 'pending',
    pickupTime: null,
  },
];
