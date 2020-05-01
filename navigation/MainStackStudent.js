import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from '../screens/HomeScreenStudent';
import Filters from '../screens/Filters';
import SearchResults from '../screens/SearchResults';
import TutorProfile from '../screens/TutorProfile';
import Location from '../screens/Location';
import Hire from '../screens/Hire';
import EnterCard from '../screens/EnterCard';
import BasicInfo from '../screens/BasicInfo';
import HireTwo from '../screens/HireTwo';
import Timetable from '../screens/Timetable';

import Colors from '../constants/Colors';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'HomeScreen';

export default function MainStack({ navigation, route }) {
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
                    title:"Home", 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="HomeScreen"
                component={HomeScreen}
                
            />
            <stackNav.Screen
                name="SearchResults"
                component={SearchResults}
                options={{
                    title: 'Search Results', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,      
                }}
            />
            <stackNav.Screen
                name="Filters"
                component={Filters}
                options={{
                    title: 'Filters', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,           
                }}
            />
            <stackNav.Screen
                name="Hire"
                component={Hire}
                options={{
                    title: 'Details', 
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
                name="TutorProfile"
                component={TutorProfile}
                options={{
                    title: 'Profile', 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary,        
                }}
            />
            <stackNav.Screen
                name="Timetable"
                component={Timetable}
                options={{
                    title: 'Timetable', 
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
                name="HireTwo"
                component={HireTwo}
                options={{
                    title: 'Hire', 
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