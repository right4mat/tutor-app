
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/LinksScreen';
import BasicInfo from '../screens/BasicInfo';
import CardDetails from '../screens/CardDetails';
import EnterCard from '../screens/EnterCard';
import Location from '../screens/Location';
import Password from '../screens/Password';

import Colors from '../constants/Colors';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Links';

export default function ClientProfileStack({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  let [fontsLoaded] = useFonts({
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {


    return (
        <stackNav.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <stackNav.Screen
                options={{
                    header: null,
                    headerMode: 'none',
                    headerShown: false, 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="Profile"
                component={Profile}
                
            />
            <stackNav.Screen
                name="BasicInfo"
                component={BasicInfo}
                options={{
                    title: 'Basic Info', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,            
                }}
            />
            <stackNav.Screen
                name="CardDetails"
                component={CardDetails}
                options={{
                    title: 'Card Details', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,             
                }}
            />
            <stackNav.Screen
                name="EnterCard"
                component={EnterCard}
                options={{
                    title: 'Enter Card', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,             
                }}
            />
            
        <stackNav.Screen
                name="Location"
                component={Location}
                options={{
                    title: 'Location', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,             
                }}
            />
            <stackNav.Screen
                name="Password"
                component={Password}
                options={{
                    title: 'Reset Password', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,             
                }}
            />
        </stackNav.Navigator>
    );
}
}



function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Links':
      return 'Profile';
  }
}
