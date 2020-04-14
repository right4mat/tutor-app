import * as React from 'react';
import {AsyncStorage} from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import LoginStack from './LoginStack';
import Context from '../context/Context';


export default function AuthStack(props) {
    const{loggedIn, setLoggedIn, setFirstName, setLastName, setPhone, setEmail, setLocation, setAddress, setLastFour} = React.useContext(Context);

    React.useEffect(() => {

        const getDetails = async () => {
                try {
                    setLoggedIn(JSON.parse(await AsyncStorage.getItem('loggedIn')) || '');
                    setLastFour(await AsyncStorage.getItem('lastFour') || '');
                    setFirstName(await AsyncStorage.getItem('firstName') || '');
                    setLastName(await AsyncStorage.getItem('lastName') || '');
                    setPhone(await AsyncStorage.getItem('phone') || '');
                    setEmail('lukesdaniels92@gmail.com');
                    setLocation(JSON.parse(await AsyncStorage.getItem('location'))|| {lat:-33.865143, lng:151.209900});
                    setAddress(await AsyncStorage.getItem('address') || '');
                } catch (error) {
                    console.warn(error.message);
                }
            }
    
            getDetails();
    }, []);

    return (
        <>
        {loggedIn ? <BottomTabNavigator /> : <LoginStack />}
        </>
    );
  
}

