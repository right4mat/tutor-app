import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Image, View,  TextInput, TouchableOpacity, AsyncStorage, SafeAreaView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Context from '../context/Context';

import {UpdateUser} from '../services/UserData';

export default function Map({navigation}) {    
    
    const{location, setLocation} = React.useContext(Context);
    const{address, setAddress} = React.useContext(Context);
    const[possibleLocation, setPossibleLocation] = React.useState(location);
    const[possibleAddress, setPossibleAddress] = React.useState('');

   

    const saveLocation = async () =>{        
        try {
            AsyncStorage.setItem('location', JSON.stringify(possibleLocation));
            AsyncStorage.setItem('address', possibleAddress);
            setLocation(possibleLocation);
            setAddress(possibleAddress);
            UpdateUser();
        } catch (error) {
            console.warn(error.message);
        }
        navigation.goBack()
    }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>           
        <View style={styles.map}>
            <View style={styles.textInput}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed={false}   // true/false/undefined
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
            </View>
            <MapView style={styles.mapStyle} region={{
                        latitude: parseFloat(possibleLocation.lat),
                        longitude: parseFloat(possibleLocation.lng),
                        longitudeDelta:0.03,
                        latitudeDelta:0.03
                    }}>
                <MapView.Marker
                    coordinate={{
                        latitude: parseFloat(possibleLocation.lat),
                        longitude: parseFloat(possibleLocation.lng),
                    }}
                />
            </MapView>
        </View>
        <TouchableOpacity style={styles.button} onPress={saveLocation}>
                <AvenirText style={styles.buttonText} text={"Set"}/>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    picContainer:{
        height: Layout.window.height/2,
        width: Layout.window.width,
    },
    pic:{
        height: Layout.window.height/2,
        width: Layout.window.width,
        resizeMode:"cover"
    },
    brief:{
        padding:15,
        display:'flex',
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    full:{
        padding:15,
    },
    skills:{
        padding:15,
        width:"100%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"column"
    },
    skill:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        paddingRight:15,
        paddingTop:5
    },
    mapStyle:{
        flex:1
    },
    map:{
        flex:1,
        zIndex:-1
    },
    button:{
        position:'absolute',
        bottom: 30,
        right:15,
        padding:15,
        borderRadius: 30,
        overflow: "hidden",
        alignSelf: 'flex-end',
        minWidth: 100,
        backgroundColor: Colors.secondary
    },
    buttonText:{
    alignSelf: 'center',
    fontSize: 18,
    color: "#fff"
    },
    textInput:{
        position:"absolute",
        top:40,
        left:"5%",
        zIndex:3,
        width:"90%",
        borderRadius:5,
        backgroundColor:"#fff"
    },

 });