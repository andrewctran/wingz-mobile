import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectDriverLocation, selectRideRequests, selectClosestRideRequest } from '../redux/selectors';
import { setRideRequests } from '../redux/slices/rideRequestsSlice';
import { setDriverLocation } from '../redux/slices/driverSlice';
import { mockRideRequests } from '../mockRideRequests';
import { useNavigation } from '@react-navigation/native';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../constants';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const driverLocation = useSelector(selectDriverLocation);
  const rideRequests = useSelector(selectRideRequests);
  const closestRideRequest = useSelector(selectClosestRideRequest);
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setDriverLocation({ latitude, longitude }));
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      (error) => Alert.alert('Error', 'Failed to get current location.'),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    // Fetch ride requests from mock data
    dispatch(setRideRequests(mockRideRequests));
  }, [dispatch]);

  useEffect(() => {
    if (driverLocation) {
      setMapRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setLoading(false);
    }
  }, [driverLocation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion} // Ensure region updates are handled
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Your Location"
            pinColor="blue" // Different color marker for the driver's location
          >
            <Icon name="map-marker" size={30} color="blue" />
          </Marker>
        )}
        {rideRequests.map((request) => (
          <Marker
            key={request.id}
            coordinate={request.pickupLocation}
            title={`Ride Request ${request.id}`}
            description={`Pickup Location`}
            pinColor={request.id === closestRideRequest.id ? 'green' : 'red'} // Highlight the closest ride request
            onPress={() => navigation.navigate('RideRequestDetails', { rideId: request.id })}
          >
            <Icon
                name={request.status === 'accepted' ? 'flag-checkered' : 'map-marker'}
                size={30}
                color={request.id === closestRideRequest.id ? 'green' : request.status === 'accepted' ? 'black' : 'red'}
              />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
