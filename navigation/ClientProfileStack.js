
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/LinksScreen';
import BasicInfo from '../screens/BasicInfo';
import CardDetails from '../screens/CardDetails';
import EnterCard from '../screens/EnterCard';
import Location from '../screens/Location';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Links';

export default function ClientProfileStack({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <stackNav.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <stackNav.Screen
            options={{
                header: null,
                headerMode: 'none',
                headerShown: false,}}
            name="Profile"
            component={Profile}
            
        />
        <stackNav.Screen
            name="BasicInfo"
            component={BasicInfo}
            options={{
                title: 'Basic Info',           
            }}
        />
        <stackNav.Screen
            name="CardDetails"
            component={CardDetails}
            options={{
                title: 'Card Details',            
            }}
        />
        <stackNav.Screen
            name="EnterCard"
            component={EnterCard}
            options={{
                title: 'Enter Card',            
            }}
        />
       <stackNav.Screen
            name="Location"
            component={Location}
            options={{
                title: 'Location',            
            }}
        />
    </stackNav.Navigator>
  );
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
