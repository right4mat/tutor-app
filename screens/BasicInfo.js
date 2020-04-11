import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';

export default function BasicInfo({navigation}) {
    const [firstName, setFirstName] = React.useState('Luke');
    const [lastName, setLastName] = React.useState('Daniels');
    const [phone, setPhone] = React.useState('12345678');
    const [address, setAddress] = React.useState('7-9 gilbert street');
    const [email] = React.useState('lukesdaniels92@gmail.com');




  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TextInput
            style={styles.textInput}
            onChangeText={text => setFirstName(text)}
            value={firstName}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => setLastName(text)}
            value={lastName}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => setPhone(text)}
            value={phone}
        />
        <TouchableOpacity style={[styles.textInput, {display:"flex",justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}]} onPress={()=>navigation.navigate("Location")}>
            <View style={styles.cardIcon}>
                <Ionicons name={'md-pin'} size={22} color="rgba(212,175,54,0.35)" />
            </View>
            <AvenirText style={{fontSize:18}} text={"Your address"}/>
        </TouchableOpacity>
        <TextInput
            style={styles.textInputDisabled}
            value={email}
            editable={false}
        />

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding:15,
    paddingTop: 15,
  },
  textInput:{
      padding:10,
      height: 50,
      borderColor: '#d3d3d3', 
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      fontSize: 18
  },
  button:{
      marginTop: 40,
      padding:15,
      width: 100,
      borderRadius: 30,
      overflow: "hidden",
      alignSelf: 'flex-end',
      backgroundColor: 'rgba(54,212,173,1)'
  },
  buttonText:{
    alignSelf: 'center',
    fontSize: 18,
    color: "#fff"
  },
  textInputDisabled:{
    padding:10,
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor:"#f3f3f3",
    fontSize: 18
  },
  cardIcon:{
    marginRight:15
  }


});
