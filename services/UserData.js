import * as React from 'react';
import {AsyncStorage} from 'react-native';

export const SaveUserData = async (data) => {

    try {
        await AsyncStorage.setItem('userID', data.id || 'none')
        await AsyncStorage.setItem('firstName', data.firstName || 'none')
        await AsyncStorage.setItem('lastName', data.lastName || 'none')
        await AsyncStorage.setItem('phone', data.phone || 'none')
        await AsyncStorage.setItem('email', data.email || 'none')
        await AsyncStorage.setItem('location', JSON.stringify(data.location) || JSON.stringify({lat: 0, lng: 0}))
        await AsyncStorage.setItem('address', data.address || 'none')
        await AsyncStorage.setItem('lastFour', data.lastFour || '. . . .')
        await AsyncStorage.setItem('about', data.about || ' ')

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
        payload['about'] = await AsyncStorage.getItem('about');


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
            body: JSON.stringify({uri:uri, sessionID: await AsyncStorage.getItem('loggedIn'),  isStudent: JSON.parse(await AsyncStorage.getItem('isStudent'))})
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
