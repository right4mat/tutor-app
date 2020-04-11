import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, Slider, Platform, DatePickerIOS} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements'
import AvenirText from '../components/avenirText';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";    

export default function Filters({navigation}) {

    const[distance, setDistance] = React.useState(20);

   const[year1, setYear1] = React.useState(false);
   const[year2, setYear2] = React.useState(false);
   const[year3, setYear3] = React.useState(false);
   const[year4, setYear4] = React.useState(false);
   const[year5, setYear5] = React.useState(false);
   const[year6, setYear6] = React.useState(false);
   const[year7, setYear7] = React.useState(false);
   const[year8, setYear8] = React.useState(false);
   const[year9, setYear9] = React.useState(false);
   const[year10, setYear10] = React.useState(false);
   const[year11, setYear11] = React.useState(false);
   const[year12, setYear12] = React.useState(false);

   const[economics, setEconomics] = React.useState(false);
   const[maths, setMaths] = React.useState(false);
   const[science, setScience] = React.useState(false);
   const[humanities, setHumanities] = React.useState(false);
   const[pdhpe, setPdhpe] = React.useState(false);
   const[english, setEnglish] = React.useState(false);
   const[coding, setCoding] = React.useState(false);

   const [date, setDate] = React.useState(new Date());
   const [showDate, setShowDate] = React.useState(false);
   const [start, setStart] = React.useState(moment().startOf('hour'));
   const [showStart, setShowStart] = React.useState(false);
   const [finish, setFinish] = React.useState(moment(start).add(1, 'hour'));
   const [showFinish, setShowFinish] = React.useState(false);


   
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
                <AvenirText  text={"Find your prefect tutor!"}/>
            </View>       

            <TouchableOpacity style={styles.textInput} onPress={()=>setShowDate(true)}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'md-calendar'} size={22} color="rgba(212,175,54,0.35)" />
                </View>
                <AvenirText style={styles.buttonTextCard} text={getDateString(date)}/>
            </TouchableOpacity>

            <View style={styles.double}>
                <TouchableOpacity  style={[styles.textInput, {width:"48%"}]} onPress={()=>{setShowStart(true);setShowFinish(false)}}>
                    <View style={styles.cardIcon}>
                        <Ionicons name={'md-clock'} size={22} color="rgba(212,175,54,0.35)" />
                    </View>
                    <AvenirText style={styles.buttonTextCard} text={getTimeString(start)}/>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.textInput, {width:"48%"}]} onPress={()=>{setShowFinish(true);setShowStart(false)}}>
                    <View style={styles.cardIcon}>
                        <Ionicons name={'md-clock'} size={22} color="rgba(212,175,54,0.35)" />
                    </View>
                    <AvenirText style={styles.buttonTextCard} text={getTimeString(finish)}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("Location")}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'md-pin'} size={22} color="rgba(212,175,54,0.35)" />
                </View>
                <AvenirText style={styles.buttonTextCard} text={"Your address"}/>
            </TouchableOpacity>

            <View style={styles.textBox}>
                <AvenirText text={"Tutor within "+distance+"km"}/>
            </View>

            <Slider
                style = {{width:"100%", paddingVertical: 15,}}
                maximumValue={100}
                minimumValue={0}
                step={1}
                value={20}
                thumbTintColor={"#f2f2f2"}
                maximumTrackTintColor={"rgba(212,175,54,.5)"}
                minimumTrackTintColor={"rgba(54,212,173,.5)"}
                onValueChange={(x)=>setDistance(x)}
                onSlidingComplete={(x)=>setDistance(x)}
            />

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach primary school..."}/>
            </View>

            <View style={styles.primary}>
                <YearCheckBox state={year1} setState={setYear1} title={'year 1'}/>
                <YearCheckBox state={year2} setState={setYear2} title={'year 2'}/>
                <YearCheckBox state={year3} setState={setYear3} title={'year 3'}/>
                <YearCheckBox state={year4} setState={setYear4} title={'year 4'}/>
                <YearCheckBox state={year5} setState={setYear5} title={'year 5'}/>
                <YearCheckBox state={year6} setState={setYear6} title={'year 6'}/>
            </View>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach high school..."}/>
            </View>

            <View style={styles.primary}>
                <YearCheckBox state={year7} setState={setYear7} title={'year 7'}/>
                <YearCheckBox state={year8} setState={setYear8} title={'year 8'}/>
                <YearCheckBox state={year9} setState={setYear9} title={'year 9'}/>
                <YearCheckBox state={year10} setState={setYear10} title={'year 10'}/>
                <YearCheckBox state={year11} setState={setYear11} title={'year 11'}/>
                <YearCheckBox state={year12} setState={setYear12} title={'year 12'}/>
            </View>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach subjects..."}/>
            </View>

            <Subject state={maths} setState={setMaths} title={"Maths"} icon={'ios-calculator'}/>

            <Subject state={english} setState={setEnglish} title={"English"} icon={'ios-paper'}/>

            <Subject state={science} setState={setScience} title={"Science"} icon={'md-beaker'}/>

            <Subject state={humanities} setState={setHumanities} title={"Humanities"} icon={'ios-book'}/>

            <Subject state={pdhpe} setState={setPdhpe} title={"PDHPE"} icon={"md-football"}/>

            <Subject state={economics} setState={setEconomics} title={"Economics"} icon={"md-trending-up"}/>

            <Subject state={coding} setState={setCoding} title={"Coding"} icon={"md-code-working"}/>

            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SearchResults")}>
                <Text style={styles.buttonText}>Save</Text>
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



const YearCheckBox = (props) => {

    return(

        <View style={styles.checkBoxContainer}>
            <CheckBox
            checkedColor='rgba(54,212,173,1)'
            checked={props.state}
            title={props.title}
            style={styles.checkBox}
            onPress={() => props.setState(!props.state)}
            />
        </View>
    );

}

const Subject = (props) => {

    return(

        <TouchableOpacity style={[styles.subject, props.state?{backgroundColor:'rgba(212,175,54,0.35)'}:false]} onPress={()=>props.setState(!props.state)}>
            <View style={styles.subjectInner}>
                <Ionicons name={props.icon} size={22} color="rgba(212,175,54,0.35)" />            
                <AvenirText style={styles.buttonTextCard} text={props.title}/>
            </View>
            <View >
                <Ionicons name={props.state?'ios-checkmark-circle':'ios-add-circle-outline'} size={22} color={props.state?'#fff':"rgba(212,175,54,0.35)"} />
            </View>
        </TouchableOpacity>
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
        flexDirection:"row"   
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