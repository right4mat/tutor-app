import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Image} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import BrandText from '../components/brandText';
import Colors from '../constants/Colors';

export default function LoginLanding({navigation}) {
    




  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <AvenirText style={{color:'#fff'}} text={"Welcome to"} />
            <BrandText style={{color:'#fff', fontSize:40}} text={"ABC Tutor Services"} />
        </View>
        <View style={styles.logo}>
            <Image
              style={styles.logoImg}
              source={require('../assets/images/abcLoginGold.png')}
            />
        </View>
        <View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")} >
                <AvenirText style={styles.buttonText} text={"Login" }/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor:"#fff"}]} onPress={()=>navigation.navigate("Signup")}>
                <AvenirText style={styles.buttonTextGold} text={"New student?"}/>
            </TouchableOpacity>            
        </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor: Colors.secondaryLight
  },
  button:{
    marginBottom: 15,
    padding:15,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    width: 200
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
    logo:{
        height:"35%"

    },
    logoImg:{
        flex:1,
        height:"100%",
        width:undefined,
        resizeMode:"contain",
        aspectRatio:1

    }
  
});
