import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateRideRequestStatus } from '../redux/slices/rideRequestsSlice';
import { RootState } from '../redux/store';

const RideRequestDetailsScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { rideId } = route.params;
  const dispatch = useDispatch();
  const rideRequest = useSelector((state: RootState) =>
    state.rideRequests.requests.find((request) => request.id === rideId)
  );

  if (!rideRequest) {
    return (
      <View style={styles.container}>
        <Text>Ride request not found</Text>
      </View>
    );
  }

  const handleAccept = () => {
    dispatch(updateRideRequestStatus({ id: rideRequest.id, status: 'accepted' }));
    navigation.goBack();
  };

  const handleDecline = () => {
    dispatch(updateRideRequestStatus({ id: rideRequest.id, status: 'declined' }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Pickup Location: {rideRequest.pickupLocation.latitude}, {rideRequest.pickupLocation.longitude}</Text>
      <Text>Destination: {rideRequest.destination.latitude}, {rideRequest.destination.longitude}</Text>
      <Text>Status: {rideRequest.status}</Text>
      <Button title="Accept" onPress={handleAccept} />
      <Button title="Decline" onPress={handleDecline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RideRequestDetailsScreen;
