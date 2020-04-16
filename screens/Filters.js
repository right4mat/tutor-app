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

export default function Filters({navigation}) {

   const[distance, setDistance] = React.useState(20);

   const[yeark2, setYeark2] = React.useState(false);
   const[year36, setYear36] = React.useState(false);
   const[year710, setYear710] = React.useState(false);
   const[year1112, setYear1112] = React.useState(false);

   const[solo, setSolo] = React.useState(false);
   const[group, setGroup] = React.useState(false);

   const[economics, setEconomics] = React.useState(false);
   const[maths, setMaths] = React.useState(false);
   const[science, setScience] = React.useState(false);
   const[humanities, setHumanities] = React.useState(false);
   const[pdhpe, setPdhpe] = React.useState(false);
   const[english, setEnglish] = React.useState(false);
   const[coding, setCoding] = React.useState(false);
   const[dance, setDance] = React.useState(false);
   const[yoga, setYoga] = React.useState(false);
   const[geography, setGeography] = React.useState(false);

   const [date, setDate] = React.useState(new Date());
   const [showDate, setShowDate] = React.useState(false);
   const [start, setStart] = React.useState(moment().startOf('hour'));
   const [showStart, setShowStart] = React.useState(false);
   const [finish, setFinish] = React.useState(moment(start).add(1, 'hour'));
   const [showFinish, setShowFinish] = React.useState(false);

   const[french, setFrench] = React.useState(false);
   const[spanish, setSpanish] = React.useState(false);
   const[japanese, setJapanese] = React.useState(false);
   const[arabic, setArabic] = React.useState(false);
   const[german, setGerman] = React.useState(false);
   const[chinese, setChinese] = React.useState(false);
   const[indonesian, setIndonesian] = React.useState(false);
   const[hindi, setHindi] = React.useState(false);
   const[greek, setGreek] = React.useState(false);

   const[guitar, setGuitar] = React.useState(false);
   const[piano, setPiano] = React.useState(false);
   const[trumpet, setTrumpet] = React.useState(false);
   const[trombone, setTrombone] = React.useState(false);
   const[baritone, setBaritone] = React.useState(false);
   const[cello, setCello] = React.useState(false);
   const[clarinet, setClarinet] = React.useState(false);
   const[doubleBass, setDoubleBass] = React.useState(false);
   const[flute, setFlute] = React.useState(false);
   const[violin, setViolin] = React.useState(false);
   const[viola, setViola] = React.useState(false);

   const{address} = React.useContext(Context);
   const{location} = React.useContext(Context);

   const payload = () =>{
       return {

            opts:{
                location:location,
                distance:distance,
                yeark2:yeark2,
                year36:year36,
                year710:year710,
                year1112:year1112,
                solo:solo,
                group:group,
                start:start,
                finish:finish,
                date:date
            },


            subjects:{
                
                economics:economics,
                maths:maths,
                science:science,
                humanities:humanities,
                pdhpe:pdhpe,
                english:english,
                dance:dance,
                yoga:yoga,
                coding:coding,
                geography:geography,

                french:french,
                spanish:spanish,
                japanese:japanese,
                arabic:arabic,
                german:german,
                chinese:chinese,
                indonesian:indonesian,
                hindi:hindi,
                greek:greek,

                guitar:guitar,
                piano:piano,
                trumpet:trumpet,
                trombone:trombone,
                baritone:baritone,
                cello:cello,
                clarinet:clarinet,
                doubleBass:doubleBass,
                guitar:guitar,
                flute:flute,
                violin:violin,
                viola:viola
            }
       }
   }

   
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

            <TouchableOpacity style={styles.textInput} onPress={()=>navigation.navigate("Location")}>
                <View style={styles.cardIcon}>
                    <Ionicons name={'md-pin'} size={22} color={Colors.secondaryLight} />
                </View>
                <AvenirText style={styles.buttonTextCard} text={address}/>
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
                <AvenirText text={"I want to be tutored..."}/>
            </View>

            <View style={styles.primary}>
                <YearCheckBox state={solo} setState={setSolo} title={'solo'}/>
                <YearCheckBox state={group} setState={setGroup} title={'in a group'}/>
            </View>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach primary school..."}/>
            </View>

            <View style={styles.primary}>
                <YearCheckBox state={yeark2} setState={setYeark2} title={'years k-2'}/>
                <YearCheckBox state={year36} setState={setYear36} title={'years 3-6'}/>
            </View>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach high school..."}/>
            </View>

            <View style={styles.primary}>
                <YearCheckBox state={year710} setState={setYear710} title={'years 7-10'}/>
                <YearCheckBox state={year1112} setState={setYear1112} title={'years 11-12'}/>
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

            <Subject state={yoga} setState={setYoga} title={"Yoga"} icon={"ios-body"}/>

            <Subject state={dance} setState={setDance} title={"Dance"} icon={"md-musical-notes"}/>

            <Subject state={geography} setState={setGeography} title={"Geography"} icon={"md-globe"}/>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach languages..."}/>
            </View>

            
   

            <Subject state={french} setState={setFrench} title={"French"} icon={'ios-quote'}/>

            <Subject state={spanish} setState={setSpanish} title={"Spanish"} icon={"ios-quote"}/>

            <Subject state={japanese} setState={setJapanese} title={"Japanese"} icon={"ios-quote"}/>

            <Subject state={arabic} setState={setArabic} title={"Arabic"} icon={"ios-quote"}/>

            <Subject state={german} setState={setGerman} title={"German"} icon={"ios-quote"}/>
            
            <Subject state={chinese} setState={setChinese} title={"Chinese (Mandarin)"} icon={"ios-quote"}/>
            
            <Subject state={indonesian} setState={setIndonesian} title={"Indonesian"} icon={"ios-quote"}/>

            <Subject state={hindi} setState={setHindi} title={"Hindi"} icon={"ios-quote"}/>

            <Subject state={greek} setState={setGreek} title={"Modern Greek"} icon={"ios-quote"}/>

            <View style={styles.textBox}>
                <AvenirText text={"I need a tutor that can teach music..."}/>
            </View>

            <Subject state={guitar} setState={setGuitar} title={"Guitar"} icon={"ios-musical-note"}/>

            <Subject state={piano} setState={setPiano} title={"Piano"} icon={"ios-musical-note"}/>

            <Subject state={trumpet} setState={setTrumpet} title={"Trumpet"} icon={"ios-musical-note"}/>

            <Subject state={trombone} setState={setTrombone} title={"Trombone"} icon={"ios-musical-note"}/>

            <Subject state={baritone} setState={setBaritone} title={"Baritone"} icon={"ios-musical-note"}/>

            <Subject state={cello} setState={setCello} title={"Cello"} icon={"ios-musical-note"}/>

            <Subject state={clarinet} setState={setClarinet} title={"Clarinet"} icon={"ios-musical-note"}/>

            <Subject state={doubleBass} setState={setDoubleBass} title={"Double bass"} icon={"ios-musical-note"}/>

            <Subject state={flute} setState={setFlute} title={"Flute"} icon={"ios-musical-note"}/>

            <Subject state={violin} setState={setViolin} title={"Violin"} icon={"ios-musical-note"}/>

            <Subject state={viola} setState={setViola} title={"Viola"} icon={"ios-musical-note"}/>

            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SearchResults", payload())}>
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
            checkedColor={Colors.secondaryLight}
            checked={props.state}
            title={props.title}
            containerStyle={styles.checkBox}
            onPress={() => props.setState(!props.state)}
            />
        </View>
    );

}

const Subject = (props) => {

    return(

        <TouchableOpacity style={[styles.subject, props.state?{backgroundColor:Colors.secondaryLight}:false]} onPress={()=>props.setState(!props.state)}>
            <View style={styles.subjectInner}>
                <Ionicons name={props.icon} size={22} color={props.state? '#fff' : Colors.primaryLight} />            
                <AvenirText style={styles.buttonTextCard} text={props.title}/>
            </View>
            <View >
                <Ionicons name={props.state?'ios-checkmark-circle':'ios-add-circle-outline'} size={22} color={props.state?'#fff':Colors.primaryLight} />
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
        flex:1
    },
    checkBoxContainer:{
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row",
        width:"40%"
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