import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground, Platform, KeyboardAvoidingView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Context from '../context/Context';

export default function SignupFinish({route, navigation}) {

    const{loggedIn, setLoggedIn} = React.useContext(Context);
    const[signup] = React.useState(route.params)
    const[address, setAddress] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[location, setLocation] = React.useState('');
    const[phone, setPhone] = React.useState('');

    
    const addUser =  async (payload) =>{
        if(!validatePassword(password)){
          alert("Password must be at least 8 charatures, including one number and a mixture of upper and lowercase")
          return false;
        }
        if(!signup.fb)
          payload['pass'] = password;
        payload['address'] = address;
        payload['phone'] = phone;
        payload['lat'] = location.lat;
        payload['lng'] = location.lng;
        const response = await fetch('https://lsdsoftware.net/abctutor/signup.php', {
          method: 'post',
          body: JSON.stringify(payload),
        })
        const result = await response.text();
        if(result === "inserted")
          setLoggedIn(true);
        else{
          alert(result);
          navigation.goBack();
        }
      }

    const validatePassword = (pass) =>{
      if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(pass))
        return true;
      else
        return false;

    }
  




  return (
    <View style={styles.container}>        
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>

            <View 
            style={styles.container}
            >
                <View style={styles.login}>
                    {route.params.fb ? false :
                        <> 
                        <LongText style={{marginBottom:15,width:Layout.window.width*.8}} text={"(Password must be at least 8 charatures, including one number and a mixture of upper and lowercase)"}/>                       
                        <TextInput 
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        password={true}
                        onChangeText={(text)=>setPassword(text)}
                        value={password}
                        />
                        
                        </>
                    }
                    <TextInput 
                    style={styles.textInput}
                    placeholder="Phone"
                    onChangeText={(text)=>setPhone(text)}
                    value={phone}
                    />
                    <View style={{width:Layout.window.width*.8, height:Layout.window.height*.45, marginBottom:15}}>
                      <GooglePlacesAutocomplete
                      placeholder='Search'
                      minLength={2} // minimum length of text to search
                      autoFocus={false}
                      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                      listViewDisplayed='auto'    // true/false/undefined
                      fetchDetails={true}
                      renderDescription={row => row.description} // custom description render
                      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          //console.warn(data);
                          setLocation(details.geometry.location);
                          setAddress(data.description);
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
                  </View>                  

                </View>

                <TouchableOpacity style={styles.button} onPress={()=>addUser(signup)} >
                        <AvenirText style={styles.buttonText} text={"Finish" }/>
                </TouchableOpacity>      
                
                <View>
                    <LongText style={{color:'grey'}} text={"If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"} />   
                </View>
            </View>
        </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor: "rgba(255,255,255,.7)",
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
