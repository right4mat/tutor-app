import * as React from 'react';
import {AsyncStorage} from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import LoginStack from './LoginStack';
import Context from '../context/Context';
import Loading from '../components/Loading';

import {checkLogin} from '../services/Login';


export default function AuthStack(props) {
    const{loggedIn, setLoggedIn} = React.useContext(Context);
    const[isLoading, setIsLoading] = React.useState(false);   

    const authSwitch = async () =>{
        if(await checkLogin()){
            setLoggedIn(true)
        }
        setIsLoading(false)
    }


    
    
    //authSwitch();

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

