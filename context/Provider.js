import React, { useEffect } from 'react';
import Context from './Context.js';
import {AsyncStorage} from "react-native";

export default function Provider (props){

   const[loggedIn, setLoggedIn] = React.useState(false);
   const[location, setLocation] = React.useState();
   const[address, setAddress] = React.useState();

   const [userID, setUserID] = React.useState('');

   const [firstName, setFirstName] = React.useState('');
   const [lastName, setLastName] = React.useState('');
   const [phone, setPhone] = React.useState('');    
   const [email, setEmail] = React.useState('');
   const [lastFour, setLastFour] = React.useState('');
   const [isStudent, setIsStudent] = React.useState(true);
   const [photo, setPhoto] = React.useState(false);
   const [jobsConfirm, setJobsConfirm] = React.useState([]);
   const [jobsUpComing, setJobsUpComing] = React.useState([]);

   const [reLoad, setReload] = React.useState(false);




    
    

   
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
                jobsConfirm, setJobsConfirm,
                jobsUpComing, setJobsUpComing,
                userID, setUserID,
                reLoad, setReload,
                photo, setPhoto
            }}
        >
            {props.children}
        </Context.Provider>
    );
    
}