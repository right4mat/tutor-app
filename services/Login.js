
import * as React from 'react';
import {
    AsyncStorage,
    Vibration, Platform
} from 'react-native';

import {SaveUserData} from './UserData';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';







export const login = async (payload) => {
  
    const response = await fetch('https://lsdsoftware.io/abctutors/login.php', {
        method: 'post',
        body: JSON.stringify(payload)
    })

    
    const result = await response.json();

    console.log(result)

    if (result.result === "success") {
        await AsyncStorage.setItem('loggedIn', result.token);
        await SaveUserData(result.user);
        return result.user;
    } else {
        alert(result.result);
        return false;
    }
}

export const checkLogin = async () => {
    const token =  await AsyncStorage.getItem('loggedIn') || false;
    if (token) {
            const response = await fetch('https://lsdsoftware.io/abctutors/sessions.php', {
                method: 'post',
                body: JSON.stringify({token: token})
            })
            if (await response.text() === 'success'){
                registerForPushNotificationsAsync();
                return true;
            }else 
                return false;
    }else{
        return false;
    }     
    
}

export const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      addExpoToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const addExpoToken = async (token, isStudent) => {
    const response = await fetch(
    "https://lsdsoftware.io/abctutors/addpushtoken.php",
    {
        method: "post",
        body: JSON.stringify({sessionID: await AsyncStorage.getItem('loggedIn'), expoToken:token, isStudent:JSON.parse(await AsyncStorage.getItem('isStudent'))}),
    });

    const result = await response.json();

    if (result.result === "success") {
        console.log(result.result)
    } else {
        alert(result.result);
        return false;
    }
};
