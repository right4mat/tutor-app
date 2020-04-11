import * as React from 'react';
import { Text } from 'react-native';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function BrandText(props) {

  let [fontsLoaded] = useFonts({
    'ABCheader': require('../assets/fonts/ABCnannyBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text style={[{fontFamily:"ABCheader"}, props.style]}>{props.text}</Text>
    );
  }
}