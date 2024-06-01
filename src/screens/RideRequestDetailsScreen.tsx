import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { updateRideRequestStatus } from '../redux/slices/rideRequestsSlice';
import { RootState } from '../redux/store';

const RideRequestDetailScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const dispatch = useDispatch();

  const rideRequest = useSelector((state: RootState) =>
    state.rideRequests.requests.find((request) => request.id === rideId)
  );

  if (!rideRequest) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Ride request not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Request Details</Text>
      <Text style={styles.detailText}>Pickup Location: {rideRequest.pickupLocation.latitude}, {rideRequest.pickupLocation.longitude}</Text>
      <Text style={styles.detailText}>Destination: {rideRequest.destination.latitude}, {rideRequest.destination.longitude}</Text>
      <Text style={styles.detailText}>Status: {rideRequest.status}</Text>
      <Text style={styles.detailText}>User: {rideRequest.userId}</Text>
      <Button
        title="Accept"
        buttonStyle={styles.acceptButton}
        onPress={() => {
          dispatch(updateRideRequestStatus({ id: rideId, status: 'accepted' }));
          navigation.goBack();
        }}
      />
      <Button
        title="Decline"
        buttonStyle={styles.declineButton}
        onPress={() => {
          dispatch(updateRideRequestStatus({ id: rideId, status: 'declined' }));
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    marginBottom: 10,
  },
  declineButton: {
    backgroundColor: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default RideRequestDetailScreen;
