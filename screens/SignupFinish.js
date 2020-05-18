import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground, AsyncStorage, SafeAreaView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import Loading from '../components/Loading';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Context from '../context/Context';

import {SaveUserData} from '../services/UserData';

import * as WebBrowser from "expo-web-browser";

export default function SignupFinish({route, navigation}) {

    const{loggedIn, setLoggedIn, setFirstName, setLastName,setPhone,setEmail,setLocation,setAddress, setIsStudent, setUserID, setLastFour} = React.useContext(Context);
    const[signup] = React.useState(route.params)
    const[address, setPossibleAddress] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[location, setPossibleLocation] = React.useState('');
    const[phone, setPossiblePhone] = React.useState('');
    const[isLoggingIn, setIsLoggingIn] = React.useState(false);

    const add = async (payload) =>{
      if(!validatePassword(password)){
        alert("Password must be at least 8 charatures, including one number and a mixture of upper and lowercase")
        return false;
      }
      payload['pass'] = password;
      payload['address'] = address;
      payload['phone'] = phone;
      payload["location"] = location;
      payload['lat'] = location.lat;
      payload['lng'] = location.lng;
      setIsLoggingIn(true);
      if(await addUser(payload))
        setLoggedIn(true)
      else
        navigation.goBack();

    }

    const addUser = async (payload) => {

      try{

      const response = await fetch('https://lsdsoftware.io/abctutors/signup.php', {
          method: 'post',
          body: JSON.stringify(payload)
      })
      const result = await response.json();
      if (result.result === "success") {
          try {
              await AsyncStorage.setItem('loggedIn', result.token)
              await AsyncStorage.setItem('isStudent', JSON.stringify(true))
              setIsStudent(true);
              SaveUserData(payload);
              SetAppState(payload);
              return true;
          } catch (error) {
              alert(error);
              return false;
          }
      } else {
          alert(result.result);
          return false;
      }

    } catch (e) {
      alert(e);
      navigation.goBack();
      return false;
    }
  }

  const SetAppState = (payload) => {
    setFirstName(payload.firstName || "none");
    setLastName(payload.lastName || "none");
    setPhone(payload.phone || "none");
    setEmail(payload.email || "none");
    setLocation(payload.location || { lat: 0, lng: 0 });
    setAddress(payload.address || "none");
    setUserID(payload.id || "none");
    setLastFour(payload.lastFour || ". . . .");
  };
       
    

    const validatePassword = (pass) =>{
      if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(pass))
        return true;
      else
        return false;
    }


  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>   
        {isLoggingIn ? <Loading/> : false}       
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>

            <View 
            style={styles.container}
            >
                <View style={styles.login}>
                        
                    <LongText style={{marginBottom:15,width:Layout.window.width*.8}} text={"(Password must be at least 8 charatures, including one number and a mixture of upper and lowercase)"}/>                       
                    <TextInput 
                    returnKeyType='done'
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    password={true}
                    onChangeText={(text)=>setPassword(text)}
                    value={password}
                    />                      
                    
                    <TextInput 
                    returnKeyType='done'
                    style={styles.textInput}
                    placeholder="Phone"
                    onChangeText={(text)=>setPossiblePhone(text)}
                    value={phone}
                    keyboardType = 'numeric'
                    />
                    <View style={{width:Layout.window.width*.8, height:Layout.window.height*.45, marginBottom:15}}>
                      <GooglePlacesAutocomplete
                      placeholder='Address'
                      minLength={2} // minimum length of text to search
                      autoFocus={true}
                      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                      listViewDisplayed={false}    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={row => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          //console.warn(data);
                          setPossibleLocation(details.geometry.location);
                          setPossibleAddress(data.description);
                      }}

                      getDefaultValue={() => ''}

                      query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: 'AIzaSyBbT6NbPR0uWuVTNjCXqgT2M1hVjz4wY9s',
                          language: 'en', // language of the results
                          types: 'geocode' // default: 'geocode'
                      }}

                      styles={{
                          textInputContainer: {
                              alignSelf:"center",
                              width: '100%',
                              height:50,
                              borderRadius:5,
                              backgroundColor: '#fff',
                              borderWidth: 1,
                              borderColor:"#d3d3d3",
                              fontSize:18
                          },
                          textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#000',
                            fontSize: 18
                          },
                          description: {
                              fontWeight: 'bold',
                              fontSize:18,
                              backgroundColor:"#fff"
                          },
                          predefinedPlacesDescription: {
                              color: '#d3d3d3',
                              fontSize:18
                          },
                          listView:{
                            backgroundColor:"#fff",
                            borderRadius:5,
                            borderWidth: 1,
                            borderColor:"#d3d3d3",
                          }
                      }}

                      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                      GoogleReverseGeocodingQuery={{
                          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }}
                      GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          rankby: 'distance',
                          type: 'cafe'
                      }}
                      
                      GooglePlacesDetailsQuery={{
                          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                          fields: 'geometry',
                      }}

                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      predefinedPlaces={[]}

                      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                      renderLeftButton={()  => false}
                      renderRightButton={() => false}
                  />
 
 <TouchableOpacity style={styles.button} onPress={()=>add(signup)} >
                        <AvenirText style={styles.buttonText} text={"Finish" }/>
                </TouchableOpacity> 
                  </View> 

                
                <TouchableOpacity style={{paddingHorizontal:15}} onPress={()=> WebBrowser.openBrowserAsync(
                  "https://abc-nanny-services.flycricket.io/privacy.html"
                )}>
                    <LongText style={{color:'grey'}} text={"If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"} />   
                </TouchableOpacity>                 

                </View>

                
            </View>
        </ImageBackground>
    </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor: "rgba(255,255,255,.9)",
    padding:0,
    margin:0
  },
  image: {
    flex: 1,
    width:"100%",
    resizeMode: "cover",
  },
  
  textInput:{
    padding:10,
    height: 50,
    borderColor: '#d3d3d3', 
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "flex-start",
    display:"flex",
    flexDirection:"row",
    backgroundColor:"#fff",
    width:Layout.window.width*.8
},
  button:{
    alignSelf: 'center',
    marginBottom: 15,
    padding:15,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    width: 200
    },
    buttonFB:{
        backgroundColor:"#3b5998",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row",
        width: 250
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 18,
        color: "#fff"
    },
    buttonTextGold:{
        alignSelf: 'center',
        fontSize: 18,
        color: Colors.primary
    },
    login:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    }
  
});
