import React from 'react';
import Context from './Context.js';
import {AsyncStorage} from "react-native";

export default function Provider (props){

   const[loggedIn, setLoggedIn] = React.useState(false);
   const[location, setLocation] = React.useState();
   const[address, setAddress] = React.useState();

   const [firstName, setFirstName] = React.useState('');
   const [lastName, setLastName] = React.useState('');
   const [phone, setPhone] = React.useState('');    
   const [email, setEmail] = React.useState('lukesdaniels92@gmail.com');
   const [lastFour, setLastFour] = React.useState('');  
    
    

   
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
                lastFour, setLastFour
            }}
        >
            {props.children}
        </Context.Provider>
    );
    
}