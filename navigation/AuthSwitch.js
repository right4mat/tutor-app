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
    



    
    const authSwitch = async () =>{

        if(await checkLogin()){
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

