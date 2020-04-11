import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';
import Filters from '../screens/Filters';
import SearchResults from '../screens/SearchResults';
import TutorProfile from '../screens/TutorProfile';
import Location from '../screens/Location';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'HomeScreen';

export default function MainStack({ navigation, route }) {
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
                headerShown: false,
            }}
            name="HomeScreen"
            component={HomeScreen}
            
        />
        <stackNav.Screen
            name="SearchResults"
            component={SearchResults}
            options={{
                title: 'Search Results',           
            }}
        />
        <stackNav.Screen
            name="Filters"
            component={Filters}
            options={{
                title: 'Filters',            
            }}
        />
        <stackNav.Screen
            name="TutorProfile"
            component={TutorProfile}
            options={{
                title: 'Profile',            
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