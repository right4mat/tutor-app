import * as React from 'react';
import { Text } from 'react-native';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function AvenireText(props) {

  let [fontsLoaded] = useFonts({
    'lato': require('../assets/fonts/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Text style={[{fontFamily:"lato"}, props.style]}>{props.text}</Text>
    );
  }
}


