import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';

import Context from '../context/Context';

const validatePassword = (pass) =>{
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(pass))
      return true;
    else
      return false;
  }

export default function EnterCard({navigation}) {
    
    const [passwordOne, setPasswordOne] = React.useState('');
    const [passwordTwo, setPasswordTwo] = React.useState('');

    const{isStudent} = React.useContext(Context);

    const changePassword = async () => {

        try{

        if(passwordOne !== passwordTwo){
            alert("Sorry, passwords dont match.")
            return false;
        }else if(!validatePassword(passwordOne)){
            alert("Password must be at least 8 charatures, including one number and a mixture of upper and lowercase")
            return false;
        }

        console.log(isStudent)

        const response = await fetch('https://lsdsoftware.io/abctutors/changepassword.php', {
            method: 'post',
            body: JSON.stringify({password1:passwordOne,password2:passwordTwo, isStudent: isStudent, sessionID: await AsyncStorage.getItem('loggedIn')})
        })
        const result = await response.json();
        console.log(result)
        if (result.result === "success") {
            setPasswordOne('')
            setPasswordTwo('')
            alert(result.result);
            navigation.goBack();
            
        } else {
            alert(result.result);
            return false;
        }

    }catch(e){
        alert(e);
        return false;
      }
    }




    return (
        <View style={styles.container}>

            
            <LongText style={{marginBottom:15}} text={"Password must be at least 8 charatures, including one number and a mixture of upper and lowercase"}/>
            <TextInput
                secureTextEntry={true}
                password={true}
                placeholder="Password"
                style={styles.textInput}
                onChangeText={text => setPasswordOne(text)}
                value={passwordOne}
            />
            <AvenirText style={{marginBottom:15}}  text={"Write your password again"}/>
            <TextInput
                secureTextEntry={true}
                password={true}
                placeholder="Password"
                style={styles.textInput}
                onChangeText={text => setPasswordTwo(text)}
                value={passwordTwo}
            />           

            <TouchableOpacity style={styles.button} onPress={changePassword} >
                <Text style={styles.buttonText}>{"Update" }</Text>
            </TouchableOpacity> 



        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:15
  },
  
  header:{
    fontSize: 30,
    marginBottom:40
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
    flexDirection:"row"   
},
button:{
    marginBottom: 40,
    padding:15,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: 'flex-end',
    backgroundColor: Colors.secondary
},
buttonText:{
alignSelf: 'center',
fontSize: 18,
color: "#fff"
},
buttonTextCard:{
    //alignSelf: 'center',
    marginLeft:15,
    fontSize: 18,
    color: "#000"
},

cardIcon:{
},

double:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
},
});
