import React from 'react';
import {View, StyleSheet, ColorValue, Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderWhen from './RenderWhen';
import {COLORS, FONTS} from 'constants/theme';
import {useNavigation} from '@react-navigation/native';

interface Header {
  pageTitle?: any;
  shouldDisplayBack?: boolean;
  onBackPress?: any;
}

const Container = ({
  children,
  backgroundColor,
  header,
}: {
  children: React.ReactElement | React.ReactElement[];
  backgroundColor?: ColorValue;
  header?: Header;
}): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleOnBackPress = () => {
    if (header?.onBackPress) {
      header.onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      flexDirection: 'column',

      // Paddings to handle safe area
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      backgroundColor,
    },
    header: {
      backgroundColor: 'transparent',
    },
    contentStyle: {marginLeft: 10},
  });

  return (
    <View style={styles.container}>
      <RenderWhen condition={!!header}>
        <Appbar.Header
          statusBarHeight={Platform.OS === 'ios' ? 0 : 20}
          style={styles.header}>
          <RenderWhen condition={header?.shouldDisplayBack}>
            <Icon
              size={Platform.OS === 'ios' ? 30 : 40}
              color={COLORS.primary500}
              name={
                Platform.OS === 'ios' ? 'arrow-back-ios' : 'keyboard-arrow-left'
              }
              onPress={handleOnBackPress}
            />
          </RenderWhen>
          <RenderWhen condition={!!header?.pageTitle}>
            <Appbar.Content
              title={header?.pageTitle}
              titleStyle={FONTS.h4}
              style={styles.contentStyle}
            />
          </RenderWhen>
        </Appbar.Header>
      </RenderWhen>

      {children}
    </View>
  );
};

export default Container;
