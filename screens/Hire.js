import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Slider, Platform, DatePickerIOS} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import AvenirText from '../components/avenirText';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"; 

import Context from '../context/Context';
import Colors from '../constants/Colors';

export default function Hire({route, navigation}) {

    const[name, setName] = React.useState(route.params.tutor.firstName +' '+ route.params.tutor.lastName);
    
    //console.warn(props.filters)
   const [date, setDate] = React.useState(moment(route.params.filters.opts.date));
   const [showDate, setShowDate] = React.useState(false);
   const [start, setStart] = React.useState(moment(route.params.filters.opts.start));
   const [showStart, setShowStart] = React.useState(false);
   const [finish, setFinish] = React.useState(moment(route.params.filters.opts.finish));
   const [showFinish, setShowFinish] = React.useState(false);

   const{address} = React.useContext(Context);
   const{phone} = React.useContext(Context);
   const{lastFour} = React.useContext(Context);

   
const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
};

const onChangeStart = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowStart(false);
    setStart(moment(currentTime));
};

const onChangeFinish = (event, selectedTime) => {
    console.log(selectedTime)
    const currentTime = selectedTime;
    setShowFinish(false);
    setFinish(moment(currentTime));
};

const getDateString = (date) => {
    const sd = date.toString().split(' ');
    return [sd[0], sd[1], sd[2], sd[3]].join(' ');
}

const getTimeString = (time) => {
    let st = time.toString().split(' ');
    st = st[4].split(':');
    return [st[0],st[1]].join(':');
}

  return (
    <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.textBox}>
                <AvenirText  text={name}/>
            </View>       

            <TouchableOpacity style={styles.textInput} onPress={()=>setShowDate(true)}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'md-calendar'} size={22} color={Colors.secondaryLight} />
                </View>
                <AvenirText style={styles.buttonTextCard} text={getDateString(date)}/>
            </TouchableOpacity>

            <View style={styles.double}>
                <TouchableOpacity  style={[styles.textInput, {width:"48%"}]} onPress={()=>{setShowStart(true);setShowFinish(false)}}>
                    <View style={styles.cardIcon}>
                        <Ionicons name={'md-clock'} size={22} color={Colors.secondaryLight} />
                    </View>
                    <AvenirText style={styles.buttonTextCard} text={getTimeString(start)}/>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.textInput, {width:"48%"}]} onPress={()=>{setShowFinish(true);setShowStart(false)}}>
                    <View style={styles.cardIcon}>
                        <Ionicons name={'md-clock'} size={22} color={Colors.secondaryLight} />
                    </View>
                    <AvenirText style={styles.buttonTextCard} text={getTimeString(finish)}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("BasicInfo")}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'ios-call'} size={22} color={Colors.secondaryLight} />
                </View>
                <AvenirText style={styles.buttonTextCard} text={phone}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("Location")}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'md-pin'} size={22} color={Colors.secondaryLight} />
                </View>
                <AvenirText style={styles.buttonTextCard} text={address}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("EnterCard")}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'ios-card'} size={22} color={Colors.secondaryLight} />
                </View>
                <AvenirText style={styles.buttonTextCard} text={'. . . .  . . . .  . . . .  '+lastFour}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SearchResults", payload())}>
                <AvenirText style={styles.buttonText} text={"Hire"}/>
            </TouchableOpacity>

        </ScrollView>
        {showDate ? <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />:false}
        {showStart ? <DateTimePicker
          testID="dateTimePicker"
          value={start.toDate()}
          mode={'time'}
          is24Hour={false}
          display="default"
          minuteInterval={30}
          onChange={onChangeStart}
        />:false}
        {showFinish ? <DateTimePicker
          testID="dateTimePicker"
          value={finish.toDate()}
          mode={'time'}
          is24Hour={false}
          display="default"
          minuteInterval={30}
          onChange={onChangeFinish}
        />:false}
    </View>
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
        fontSize: 18,
        alignItems: "center",
        justifyContent: "flex-start",
        display:"flex",
        flexDirection:"row",
        overflow:"hidden"
    },
    
    button:{
        position: "absolute",
        bottom: 0,
        right:15,
        marginBottom: 40,
        padding:15,
        width: 200,
        borderRadius: 30,
        overflow: "hidden",
        alignSelf: 'flex-end',
        backgroundColor: '#d4af36'
    },
    buttonText:{
    alignSelf: 'center',
    fontSize: 18,
    color: "#fff"
    },
    buttonTextCard:{
        //alignSelf: 'center',
        marginHorizontal:15,
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
    primary:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        flexWrap:"wrap"
    },
    checkBox:{
        width:"15%"
    },
    checkBoxContainer:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        width:"30%"
    },
    textBox:{
        paddingVertical:15
    },
    subjectInner:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        width:"80%"
    },
    subject:{
        
        padding:10,
        height: 50,
        borderColor: '#d3d3d3', 
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 18,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
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


 });