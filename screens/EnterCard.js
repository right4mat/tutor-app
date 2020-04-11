import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';

export default function EnterCard() {
    
    const [name, setName] = React.useState('');
    const [cardNum, setCardNum] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');
    const [cvv, setCvv] = React.useState('');



    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>My card</Text>

            <TextInput
                autoCompleteType='name'
                placeholder="Name on card"
                style={styles.textInput}
                onChangeText={text => setName(text)}
                value={name}
            />

            <TextInput
                autoCompleteType='cc-number'
                placeholder="Number on the card"
                style={styles.textInput}
                onChangeText={text => setCardNum(text)}
                value={cardNum}
            />

            <View style={styles.double}>
                <TextInput
                    autoCompleteType='cc-exp-month'
                    placeholder="Month"
                    style={[styles.textInput, {width:"48%"}]}
                    onChangeText={text => setMonth(text)}
                    value={month}
                />
                <TextInput
                    autoCompleteType='cc-exp-year'
                    placeholder="Year"
                    style={[styles.textInput, {width:"48%"}]}
                    onChangeText={text => setYear(text)}
                    value={year}
                />
            </View>

            
            <TextInput
                style={styles.textInput}
                placeholder="cvv"
                onChangeText={text => setCvv(text)}
                value={cvv}
            />

            
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>{"Add card" }</Text>
            </TouchableOpacity>



        </ScrollView>
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
    backgroundColor: Colors.secondaryLight
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
