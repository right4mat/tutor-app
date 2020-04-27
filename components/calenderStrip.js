import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AvenirText from './avenirText';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors'

export const CalenderDay = (props) =>{
    const navigation = useNavigation();
    return(
      <TouchableOpacity  style={styles.calenderItem} onPress={() => navigation.navigate('Filters', props.payload)}>
        <View style={styles.calenderDay}>
          <AvenirText style={{color:"#fff"}}  text={props.day}/>
        </View>
        <View style={styles.calenderDate}>
          <AvenirText style={{fontSize:25, paddingVertical:0}} text={props.date}/>
        </View>
      </TouchableOpacity>
    )
}
  
export const GetDates = (startDate, daysToAdd) =>{
    var aryDates = [];

    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push([DayAsString(currentDate.getDay()), currentDate.getDate() , MonthAsString(currentDate.getMonth()), currentDate.getFullYear(),currentDate]);
    }

    return aryDates;
}

const MonthAsString = (monthIndex) => {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
}

const DayAsString = (dayIndex) => {
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tues";
    weekdays[3] = "Wed";
    weekdays[4] = "Thurs";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
}

const styles = StyleSheet.create({

    calenderDay:{
      width:"100%",
      height:"35%",
      backgroundColor: Colors.primary,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:'column'
    },
    calenderDate:{
      width:"100%",
      height:"65%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },
    calenderItem:{
      width: 65,
      height: 60,
      marginLeft:15,
      borderRadius:10,
      overflow:"hidden",
      borderWidth:1,
      borderColor:"#e5e5e5",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection: "column"
    }, 
  
  });



  