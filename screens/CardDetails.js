import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import Context from '../context/Context';

import Colors from '../constants/Colors';

export default function CardDetails({navigation}) {
    
    const {lastFour} = React.useContext(Context);




  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>My card</Text>

        <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("EnterCard")}>
            <View style={styles.cardIcon}>
                <Ionicons name={'ios-card'} size={22} color="rgba(0,0,0,0.35)" />
            </View>
            <AvenirText style={styles.buttonTextCard} text={'. . . .  . . . .  . . . .  '+lastFour}/>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("EnterCard")}>
            <AvenirText style={styles.buttonText} text={"Add card" }/>
        </TouchableOpacity>

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    fontSize: 30,
    marginBottom:40
  },
  contentContainer: {
    padding:15,
    paddingTop: 15,
    flex: 1,
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
    fontSize: 18,
    color: "#000"
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
      marginRight:20
  }


});
