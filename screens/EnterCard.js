import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, AsyncStorage, SafeAreaView} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';

import Context from '../context/Context';

var stripe = require('stripe-client')('pk_test_tQCN6i6dnFcICRPfnL0RQhBu00UPRTLEep');

export default function EnterCard({navigation}) {
    
    const [name, setName] = React.useState('');
    const [cardNum, setCardNum] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    const{setLastFour, isStudent} = React.useContext(Context);


    const infomation  = () =>{

        return {
            card: {
              number: cardNum,
              exp_month: month,
              exp_year: year,
              cvc: cvv,
              name: name
            }
        }

    }

    const sendCustomerID = async (payload) =>{
        try {
    
            const response = await fetch('https://lsdsoftware.io/abctutors/stripe.php', {
                method: 'post',
                body: JSON.stringify(payload)
            })
    
            const result = await response.json();
    
            console.log(result)
    
           if (result.result === 'success') 
                return true;
            else 
                alert(result.result);
            
    
        } catch (error) {
            alert(error)
        }
    }

    const save = async () =>{  
        try{    
            var card = await stripe.createToken(infomation());
            console.log(card)
            if(card.error)
                alert(card.error.message);            
            else{
                const l4 = cardNum.substr(cardNum.length - 4)
                AsyncStorage.setItem('lastFour', l4);
                setLastFour(l4);
                //console.log(card);
                sendCustomerID({sessionID: await AsyncStorage.getItem('loggedIn'), payload:card, lastFour:l4});
                navigation.goBack();

            }
        }catch(e){
            alert(e)
        }
    }


    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <TextInput returnKeyType='done'
                autoCompleteType='name'
                placeholder="Name on card"
                style={styles.textInput}
                onChangeText={text => setName(text)}
                value={name}
            />

            <TextInput returnKeyType='done'
                autoCompleteType='cc-number'
                placeholder="Number on the card"
                style={styles.textInput}
                onChangeText={text => setCardNum(text)}
                value={cardNum}
                keyboardType = 'numeric'
            />

            <View style={styles.double}>
                <TextInput returnKeyType='done'
                    autoCompleteType='cc-exp-month'
                    placeholder="Month"
                    style={[styles.textInput, {width:"48%"}]}
                    onChangeText={text => setMonth(text)}
                    value={month}
                    keyboardType = 'numeric'
                />
                <TextInput returnKeyType='done'
                    autoCompleteType='cc-exp-year'
                    placeholder="Year"
                    style={[styles.textInput, {width:"48%"}]}
                    onChangeText={text => setYear(text)}
                    value={year}
                    keyboardType = 'numeric'
                />
            </View>

            
            <TextInput returnKeyType='done'
                style={styles.textInput}
                placeholder="cvv"
                onChangeText={text => setCvv(text)}
                value={cvv}
                keyboardType = 'numeric'
            />

            
            <TouchableOpacity style={styles.button} onPress={save}>
                <Text style={styles.buttonText}>{"Add card" }</Text>
            </TouchableOpacity>



        </ScrollView>
        </SafeAreaView>
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
