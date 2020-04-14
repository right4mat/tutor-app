import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground, Platform, KeyboardAvoidingView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import * as Facebook from 'expo-facebook';

export default function Signup({navigation}) {

  const[firstName, setFirstName] = React.useState('');
  const[lastName, setLastName] = React.useState('');
  const[email, setEmail] = React.useState('');

    async function FBlogIn() {
        try {
          await Facebook.initializeAsync('671782060067039');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,gender,first_name,last_name`);
            const payload = await response.json();
            const user = {fb:true, firstName:payload.first_name, lastName:payload.last_name, email:payload.email, pass:payload.id};
            
            navigation.navigate("SignupFinish", user);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }

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
        navigation.navigate("SignupFinish", {fb:false, firstName:firstName, lastName:lastName, email:email})
        return true;
      }
    }    




  return (
    <View style={styles.container}>        
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>

            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            >
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonFB]} onPress={FBlogIn} >
                        <Ionicons style={{marginRight:30}} name={'logo-facebook'} size={30} color="#fff" />
                        <AvenirText style={styles.buttonText} text={"Signup with Facebook" }/>
                    </TouchableOpacity> 
                </View>
                <View style={styles.login}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="First name"
                    onChangeText={text => setFirstName(text)}
                    />
                    <TextInput 
                    style={styles.textInput}
                    placeholder="Last name"
                    onChangeText={text => setLastName(text)}
                    />
                    <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>validateSignup()} >
                        <AvenirText style={styles.buttonText} text={"Next"}/>
                    </TouchableOpacity>      
                </View>
                <View>
                    <LongText style={{color:'grey'}} text={"If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"} />   
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    justifyContent:"space-around",
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
