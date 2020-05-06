import * as React from 'react';
import {AsyncStorage} from 'react-native';

export const SaveUserData = (data) => {

    try {
        AsyncStorage.setItem('userID', data.id || 'none')
        AsyncStorage.setItem('firstName', data.firstName || 'none')
        AsyncStorage.setItem('lastName', data.lastName || 'none')
        AsyncStorage.setItem('phone', data.phone || 'none')
        AsyncStorage.setItem('email', data.email || 'none')
        AsyncStorage.setItem('location', JSON.stringify(data.location) || JSON.stringify({lat: 0, lng: 0}))
        AsyncStorage.setItem('address', data.address || 'none')
        AsyncStorage.setItem('lastFour', data.lastFour || '. . . .')

    } catch (error) {
        alert(error)
    }
}

export const UpdateUser = async () => {

    const payload = {}

    try {

        payload['firstName'] = await AsyncStorage.getItem('firstName');
        payload['lastName'] = await AsyncStorage.getItem('lastName');
        payload['phone'] = await AsyncStorage.getItem('phone');
        payload['location'] = JSON.parse(await AsyncStorage.getItem('location'));
        payload['address'] = await AsyncStorage.getItem('address');
        payload['sessionID'] = await AsyncStorage.getItem('loggedIn');
        payload['isStudent'] = JSON.parse(await AsyncStorage.getItem('isStudent'));


        const response = await fetch('https://lsdsoftware.io/abctutors/updateuser.php', {
            method: 'post',
            body: JSON.stringify(payload)
        })

        const result = await response.json();

        console.log(result)

       if (result.result === 'success') 
            return true;
        else 
            alert(result.result);
        

    } catch (error) {
        alert(error)
    }
}

export const SendPhoto = async (uri) =>{

    try {

        const response = await fetch('https://lsdsoftware.io/abctutors/uploadphoto.php', {
            method: 'post',
            body: JSON.stringify({uri:uri, sessionID: await AsyncStorage.getItem('loggedIn')})
        })

        const result = await response.json();

        if (result.result === 'success') 
            return true;
        else 
            alert(result.result);
        

    } catch (error) {
        alert(error)
    }

}
