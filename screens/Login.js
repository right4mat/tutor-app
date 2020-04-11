import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground, Platform, KeyboardAvoidingView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function Login({navigation}) {

    async function FBlogIn() {
        try {
          await Facebook.initializeAsync('<APP_ID>');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }
    




  return (
    <View style={styles.container}>        
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
            <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
            >
                <View>
                    <TouchableOpacity style={[styles.button, styles.buttonFB]} >
                        <Ionicons style={{marginRight:30}} name={'logo-facebook'} size={30} color="#fff" />
                        <AvenirText style={styles.buttonText} text={"Login with Facebook" }/>
                    </TouchableOpacity> 
                </View>
                <View style={styles.login}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    />
                    <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    />
                    <TouchableOpacity style={styles.button} >
                        <AvenirText style={styles.buttonText} text={"Login" }/>
                    </TouchableOpacity>      
                </View>
                <View>
                    <AvenirText style={{color:'grey'}} text={"If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"} />   
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
