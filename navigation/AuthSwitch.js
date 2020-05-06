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
        setUserID,
        setPhoto,
        setLastFour
    } = React.useContext(Context);


    const SetAppState = async () =>{         
    
        setFirstName(await AsyncStorage.getItem('firstName') || 'none');
        setLastName(await AsyncStorage.getItem('lastName') || 'none');
        setPhone(await AsyncStorage.getItem('phone') || 'none');
        setEmail(await AsyncStorage.getItem('email') || 'none');
        setLocation(JSON.parse(await AsyncStorage.getItem('location')) || JSON.stringify({lat:0,lng:0}));
        setAddress(await AsyncStorage.getItem('address') || 'none');
        setLastFour(await AsyncStorage.getItem('lastFour')|| '. . . .');
        setIsStudent(JSON.parse(await AsyncStorage.getItem('isStudent')));        
        setUserID(await AsyncStorage.getItem('userID'));
        setPhoto(await AsyncStorage.getItem('photo')); 
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

