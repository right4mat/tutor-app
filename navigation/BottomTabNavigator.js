import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
//import HomeScreen from '../screens/HomeScreen';
import ClientProfileStack from './ClientProfileStack';
import MainStack from './MainStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

BottomTab.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
  headerMode: 'none',
  headerShown: false,
  tabBarOptions: {
    activeTintColor: '#00E8AC',
  },
};

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{
      activeTintColor: '#d4af36',
      keyboardHidesTabBar:true,
      style :{
        shadowOffset:{  width: 0,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: .3,
        shadowRadius: 6,
        elevation: 1,}
    }}>
      <BottomTab.Screen
        name="Home"
        component={MainStack}
        navigationOptions={{header:null}}
        options={{
          header: null,
          headerMode: 'none',
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
          tabBarOptions: { activeTintColor:'#d4af36', }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ClientProfileStack}
        navigationOptions={{header:null}}
        options={{
          header: null,
          headerMode: 'none',
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          
        }}
      />
    </BottomTab.Navigator>
  );
}


