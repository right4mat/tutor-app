
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginLanding from '../screens/LoginLanding';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SignupFinish from '../screens/SignupFinish';

import Colors from '../constants/Colors';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = 'LoginLanding';

export default function LoginStack({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

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
                    animationTypeForReplace: 'pop',                     
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="LoginLanding"
                component={LoginLanding}
                
            />
            <stackNav.Screen
                options={{
                    title:"Login", 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="Login"
                component={Login}            
            />
            <stackNav.Screen
                options={{
                    title:"Signup", 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="Signup"
                component={Signup}            
            />
            <stackNav.Screen
                options={{
                    title:"Signup Finish", 
                    headerTitleStyle: {
                        color: Colors.primary,
                        fontFamily: 'Lato-Bold'
                    },
                    headerTintColor: Colors.primary, 
                }}
                name="SignupFinish"
                component={SignupFinish}            
            />             
        </stackNav.Navigator>
    );
 }
}




