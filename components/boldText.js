import * as React from 'react';
import { Text } from 'react-native';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function AvenireTextBold(props) {

  let [fontsLoaded] = useFonts({
    'latoBold': require('../assets/fonts/Lato-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text style={[{fontFamily:"latoBold"}, props.style]}>{props.text}</Text>
    );
  }
}