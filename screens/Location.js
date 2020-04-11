import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Image, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import MapView from 'react-native-maps';

export default function Map() {
    
    const[address, setAddress] = React.useState('');
    const[location, setLocation] = React.useState([-33.865143, 151.209900])



  return (
    <View style={styles.container}>           
        <View style={styles.map}>
            <TextInput
                style={styles.textInput}
                value={address}
                placeholder={"Your address"}
            /> 
            <MapView style={styles.mapStyle} region={{
                        latitude: location[0],
                        longitude: location[1],
                        longitudeDelta:0.25,
                        latitudeDelta:0.25
                    }}>
                <MapView.Marker
                    coordinate={{
                        latitude: location[0],
                        longitude: location[1],
                    }}
                />
            </MapView>
        </View>
        <TouchableOpacity style={styles.button} >
                <AvenirText style={styles.buttonText} text={"Set"}/>
        </TouchableOpacity>
    </View>
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
        backgroundColor: Colors.secondaryLight
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
        padding:10,
        height: 50,
        borderColor: '#d3d3d3', 
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        zIndex:3,
        backgroundColor:"#fff",
        width:"90%"
    },

 });