import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectDriverLocation, selectRideRequests, selectClosestRequestId } from '../redux/selectors';
import { setDriverLocation, setRideRequests } from '../redux/slices/rideRequestsSlice';
import { mockRideRequests } from '../mockRideRequests';
import { useNavigation } from '@react-navigation/native';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../constants';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const driverLocation = useSelector(selectDriverLocation);
  const rideRequests = useSelector(selectRideRequests);
  const closestRequestId = useSelector(selectClosestRequestId);
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState<Region | null>(null);

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
      (error) => console.log(error),
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
    }
  }, [driverLocation]);

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
            pinColor={request.id === closestRequestId ? 'green' : 'red'} // Highlight the closest ride request
            onPress={() => navigation.navigate('RideRequestDetails', { rideId: request.id })}
          >
            <Icon
                name={request.status === 'accepted' ? 'flag-checkered' : 'map-marker'}
                size={30}
                color={request.id === closestRequestId ? 'green' : request.status === 'accepted' ? 'black' : 'red'}
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
});

export default HomeScreen;
