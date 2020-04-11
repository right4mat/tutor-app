
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginLanding from '../screens/LoginLanding';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'LoginLanding';

export default function ClientProfileStack({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <stackNav.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <stackNav.Screen
            options={{
                header: null,
                headerMode: 'none',
                headerShown: false,}}
            name="LoginLanding"
            component={LoginLanding}
            
        />
        <stackNav.Screen
            options={{
                title:"Login"
            }}
            name="Login"
            component={Login}            
        />
        <stackNav.Screen
            options={{
                title:"Signup"
            }}
            name="Signup"
            component={Signup}            
        />            
    </stackNav.Navigator>
  );
}




