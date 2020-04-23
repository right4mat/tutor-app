
import * as React from 'react';
import {
    AsyncStorage
} from 'react-native';

import {SaveUserData} from './UserData';







export const login = async (payload) => {
    const response = await fetch('https://sydney.wextg.com/lsdsoftware/abctutors/login.php', {
        method: 'post',
        body: JSON.stringify(payload)
    })
    const result = await response.json();

    if (result.result === "success") {
        await AsyncStorage.setItem('loggedIn', result.token)
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
            const response = await fetch('https://sydney.wextg.com/lsdsoftware/abctutors/sessions.php', {
                method: 'post',
                body: JSON.stringify({token: token})
            })
            if (await response.text() === 'success') 
                return true;
            else 
                return false;
    }else{
        return false;
    }     
    
}
