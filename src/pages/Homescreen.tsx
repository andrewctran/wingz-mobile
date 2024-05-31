import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Container from '@components/Container';

const Homescreen = (): React.JSX.Element => {

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Container>
      <Text>Hello World</Text>
    </Container>
  );
};

export default Homescreen;
