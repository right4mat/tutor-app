import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image, ImageBackground,SafeAreaView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function LoginLanding({navigation}) {
    




  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.image}>
        <View style={styles.innerContainer}>
        <View style={styles.header}>
            <ImageBackground source={require('../assets/images/LandingLogo.png')} style={styles.logoImg} resizeMode="contain">
                <View style={styles.welcome}>
                    <BrandText style={{color:"#fff", fontSize:20, paddingBottom:15}} text={"Welcome to"} />
                    <BrandText style={{color:Colors.primary, fontSize:45}} text={"ABC"} />
                    <BrandText style={{color:Colors.primary, fontSize:30}} text={"NANNY SERVICES"} />
                    <BrandText style={{color:Colors.primary, fontSize:20}} text={"(Tutoring)"} />
                </View>
            </ImageBackground>
        </View>
        
        <View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login",{isStudent:true})} >
                <AvenirText style={styles.buttonText} text={"Login"}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:"#fff"}]} onPress={()=>navigation.navigate("Signup")}>
                <AvenirText style={styles.buttonTextGold} text={"New family?"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Login", {isStudent:false})}>
                <AvenirText style={styles.buttonTextBlack} text={"Tutor? Login here!"}/>
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
    backgroundColor: '#fff',
    
  },
  innerContainer:{
      flex:1,
    padding:15,
    backgroundColor:"rgba(255,255,255,.5)",
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"column",
  },
  image: {
    flex: 1,
    width: "100%",
    
    backgroundColor: "#fff",
  },
  button:{
    marginBottom: 15,
    padding:15,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    width: Layout.window.width*.8,
    borderColor:Colors.primary,
    borderWidth:1
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
    buttonTextBlack:{
        alignSelf: 'center',
        fontSize: 18,
        color: "#000"
    },
    logo:{
        height:"35%"

    },
    logoImg:{
        flex: 1, 
        height: undefined, 
        width: "100%",
        
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"column"

    },
    header:{
        height:"50%",
        width:"100%",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"column"
        
    },
    welcome:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"column",
        paddingBottom:35
    }
  
});

/*View style={styles.logo}>
            <Image
              style={styles.logoImg}
              source={require('../assets/images/ABC-Nanny-Services_Logo.png')}
            />
        </View>*/
