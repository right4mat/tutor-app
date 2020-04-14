import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';

export default function EnterCard() {
    
    const [passwordOne, setPasswordOne] = React.useState('');
    const [passwordTwo, setPasswordTwo] = React.useState('');



    return (
        <View style={styles.container}>

            
            <AvenirText style={{marginBottom:15}} text={"My password (at least 6 characters)"}/>
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

            <TouchableOpacity style={styles.button} >
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
