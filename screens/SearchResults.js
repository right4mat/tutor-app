import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { TutorLoad, TutorReal } from '../components/Tutors';

const dummyData = [
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Jane", lastName:"Smith", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Gabi", lastName:"Melocco", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:1},
    {firstName:"Michelle", lastName:"Withers", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
    {firstName:"Ange", lastName:"Taylor", age:23, skills:{maths:[1,2,3,4], english:[1,2,3,4], science:[1,2,3,4]}, distance:30, location:[-33.865143, 151.209900], price:30, avaliable:0},
]

export default function SearchResults({route}) {
    
    const [tutors, setTutors] = React.useState([])

    console.warn(route.params)

    React.useEffect(() => {
      setTimeout(()=>{
        setTutors(dummyData)
      }, 1000)  
  
    }, [])



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        {tutors.length ? <TutorReal tutors={tutors}/> : <TutorLoad/>}


    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
      padding:15,
    flex: 1,
    backgroundColor: '#fff',
    
  },
  contentContainer:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    flexWrap:"wrap"
  }
 });