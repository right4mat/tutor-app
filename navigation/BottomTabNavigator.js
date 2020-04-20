import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ProfileStackStudent from './ProfileStackStudent';
import MainStackStudent from './MainStackStudent';
import MainStackTutor from './MainStackTutor';

import Context from '../context/Context';

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

  const{isStudent, setIsStudent} = React.useContext(Context);

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
      {
      isStudent
      ?
      <>
      <BottomTab.Screen
        name="Home"
        component={MainStackStudent}
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
        component={ProfileStackStudent}
        navigationOptions={{header:null}}
        options={{
          header: null,
          headerMode: 'none',
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          
        }}
      />
      </>
      :
      <>
      <BottomTab.Screen
        name="Home"
        component={MainStackTutor}
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
        component={ProfileStackStudent}
        navigationOptions={{header:null}}
        options={{
          header: null,
          headerMode: 'none',
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          
        }}
      />
      </>
      }
    </BottomTab.Navigator>
  );
}


