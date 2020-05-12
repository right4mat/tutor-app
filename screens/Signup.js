import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground, Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BoldText from '../components/boldText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import * as WebBrowser from "expo-web-browser";

import * as Facebook from 'expo-facebook';

export default function Signup({navigation}) {

  const[firstName, setFirstName] = React.useState('');
  const[lastName, setLastName] = React.useState('');
  const[email, setEmail] = React.useState('');

    const validateEmail = (mail) =>{
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
          return true;
      }        
        return false;
    }

    const validateSignup = () =>{
      if(!firstName.length || !lastName.length){
        alert("You need to fill out all feilds") ;
        return false;
      }else if(!validateEmail(email)){
        alert("You have entered an invalid email address");
        return false;    
      }else{
        navigation.navigate("SignupFinish", {firstName:firstName, lastName:lastName, email:email})
        return true;
      }
    }    




  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>        
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>

            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            >
                <View style={styles.login}>
                    <BoldText style={{fontSize:25, width: Layout.window.width*.8, marginBottom:15, }} text={"“Anyone who has never made a mistake has never tried anything new„"}/>

                    <TextInput 
                    returnKeyType='done'
                    style={styles.textInput}
                    placeholder="First name"
                    onChangeText={text => setFirstName(text)}
                    />
                    <TextInput 
                    returnKeyType='done'
                    style={styles.textInput}
                    placeholder="Last name"
                    onChangeText={text => setLastName(text)}
                    />
                    <TextInput 
                    returnKeyType='done'
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>validateSignup()} >
                        <AvenirText style={styles.buttonText} text={"Next"}/>
                    </TouchableOpacity>      
                </View>
                <TouchableOpacity onPress={()=> WebBrowser.openBrowserAsync(
                  "https://abc-nanny-services.flycricket.io/privacy.html"
                )}>
                    <LongText style={{color:'grey'}} text={"If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"} />   
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    justifyContent:"space-around",
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
