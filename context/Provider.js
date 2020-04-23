import React, { useEffect } from 'react';
import Context from './Context.js';
import {AsyncStorage} from "react-native";

export default function Provider (props){

   const[loggedIn, setLoggedIn] = React.useState(false);
   const[location, setLocation] = React.useState();
   const[address, setAddress] = React.useState();

   const [firstName, setFirstName] = React.useState('');
   const [lastName, setLastName] = React.useState('');
   const [phone, setPhone] = React.useState('');    
   const [email, setEmail] = React.useState('');
   const [lastFour, setLastFour] = React.useState('');
   const [isStudent, setIsStudent] = React.useState(true);
   const [photo, setPhoto] = React.useState(false);

   useEffect(()=>{
        const SetAppState = async () =>{         
        
            setFirstName(await AsyncStorage.getItem('firstName') || 'none');
            setLastName(await AsyncStorage.getItem('lastName') || 'none');
            setPhone(await AsyncStorage.getItem('phone') || 'none');
            setEmail(await AsyncStorage.getItem('email') || 'none');
            setLocation(JSON.parse(await AsyncStorage.getItem('location')) || JSON.stringify({lat:0,lng:0}));
            setAddress(await AsyncStorage.getItem('address') || 'none');
            setLastFour(await AsyncStorage.getItem('lastFour')|| 'none');
            setIsStudent(JSON.parse(await AsyncStorage.getItem('isStudent')));  
        }

        SetAppState();
   },[])


    
    

   
    return (
        <Context.Provider
            value={{
                loggedIn, setLoggedIn, 
                location, setLocation, 
                address, setAddress,
                firstName, setFirstName,
                lastName, setLastName,
                phone, setPhone,
                email, setEmail,
                lastFour, setLastFour,
                isStudent, setIsStudent,
                photo, setPhoto
            }}
        >
            {props.children}
        </Context.Provider>
    );
    
}