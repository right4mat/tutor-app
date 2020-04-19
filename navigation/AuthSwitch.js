import * as React from 'react';
import {AsyncStorage} from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import LoginStack from './LoginStack';
import Context from '../context/Context';
import Loading from '../components/Loading';

import {checkLogin} from '../services/Login';


export default function AuthStack(props) {
    const[isLoading, setIsLoading] = React.useState(false);

    const{
        loggedIn, 
        setLoggedIn, 
        setFirstName, 
        setLastName,
        setPhone,
        setEmail,
        setLocation,
        setAddress,
        setIsStudent,
        setPhoto
    } = React.useContext(Context);
    

    const SetAppState = async (payload) =>{     
        
        setPhoto(await AsyncStorage.getItem('photo')|| false);
        setFirstName(await AsyncStorage.getItem('firstName') || '');
        setLastName(await AsyncStorage.getItem('lastName') || '');
        setPhone(await AsyncStorage.getItem('phone') || '');
        setLocation(JSON.parse(await AsyncStorage.getItem('location')) || {lat: 0, lng: 0});
        setAddress(await AsyncStorage.getItem('address') || '');
        setIsStudent(JSON.parse(await AsyncStorage.getItem('isStudent')) || true);
        setEmail(await AsyncStorage.getItem('email') || '');

    }

    const authSwitch = async () =>{

        if(await checkLogin()){
            await SetAppState();
            setLoggedIn(true)
        }
        setIsLoading(false)
    }


    React.useEffect(()=>{
      
    
        authSwitch();
    },[])

    return (
        <>
        {
        isLoading ? <Loading/>
         : loggedIn ? <BottomTabNavigator />
         : <LoginStack />
         }
        </>
    );
  
}

