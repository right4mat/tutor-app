import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet,TouchableOpacity, View, FlatList} from 'react-native';

import AvenirText from './avenirText';
import AvenirTextBold from './boldText';

import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';





export const Tutors = (props) =>{

  const navigation = useNavigation();

  //console.warn(props.filters)
    
    const avaliableNow = () =>{
      return (
        <View style={styles.avaliableNow}><AvenirText style={{color:"#fff"}} text={"Avaliable now"}/></View>
      )
    }
    const Tutor = (props) =>{
      return (
        <TouchableOpacity  style={styles.nannyItem}  onPress={() => navigation.navigate('TutorProfile', props)}>
          <View style={styles.nannyThumbContainer}>
            {false ? avaliableNow() : false}
            <Image
              style={styles.nannyThumb}
              source={{uri:'https://randomuser.me/api/portraits/'+props.tutor.photo}}
            />
          </View>
          <View style={styles.basicInfoContainer}>
            <AvenirTextBold style={{fontWeight:'700', fontSize:16}} text={props.tutor.firstName+' '+props.tutor.lastName}/>
            <View style={styles.basicInfo}>
              <AvenirText text={"$"+props.tutor.price+"/h"}/>
              <AvenirText style={{color:"grey"}} text={"|"}/>
              <AvenirText style={{color:"grey"}} text={Math.floor(props.tutor.distance)+"km"}/>
            </View>          
          </View> 
        </TouchableOpacity>
      );
    } 

  let data = Object.keys(props.tutors).map(tutor =>  props.tutors[tutor]);
  //console.warn(data)
  return(
  <FlatList
    numColumns={2}
    data={data}
    renderItem={({ item }) => <Tutor tutor={item} filters={props.filters}/>}
  />)

}

const styles = StyleSheet.create({
    nannyItem:{
      width:Layout.window.width*.4,
      height:Layout.window.width*.6,   
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      margin: Layout.window.width*.03,
    },
    nannyThumb:{
      width:undefined,
      height: "100%",
      aspectRatio: 1,
      resizeMode:"contain"
    },
    nannyThumbContainer:{
      height:"80%",
      width:"100%",
      borderRadius: 10,
      overflow:"hidden"
    },
    basicInfoContainer:{
      width:'100%',
    },
    basicInfo:{
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:"row"
    },
    avaliableNow:{
      position:"absolute",
      top:5,
      right:10,
      borderRadius:15,
      backgroundColor:Colors.secondary,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      zIndex:2,
      padding:3,
      paddingHorizontal:5
  
    }
  
  
  
  });