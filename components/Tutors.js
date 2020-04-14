import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet,TouchableOpacity, View} from 'react-native';

import AvenirText from './avenirText';
import AvenirTextBold from './boldText';

import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';



export const TutorLoad = () =>{
    const nanny = () =>{
      return (
        <View  style={styles.nannyItem}>
          <Ionicons name={'md-person'} size={190} color="#f2f2f2" />
        </View>
      );
    }  
    return [nanny(), nanny(), nanny(), nanny(),nanny(), nanny()]
}
  
export const TutorReal = (props) =>{
    const navigation = useNavigation();
    const avaliableNow = () =>{
      return (
        <View style={styles.avaliableNow}><AvenirText style={{color:"#fff"}} text={"Avaliable now"}/></View>
      )
    }
    const nanny = (tutor) =>{
      return (
        <TouchableOpacity  style={styles.nannyItem}  onPress={() => navigation.navigate('TutorProfile', tutor)}>
          <View style={styles.nannyThumbContainer}>
            {tutor.avaliable ? avaliableNow() : false}
            <Image
              style={styles.nannyThumb}
              source={require('../assets/images/tutorPic.png')}
            />
          </View>
          <View style={styles.basicInfoContainer}>
            <AvenirTextBold style={{fontWeight:'700', fontSize:16}} text={tutor.firstName+' '+tutor.lastName}/>
            <View style={styles.basicInfo}>
              <AvenirText text={"$"+tutor.price+"/h"}/>
              <AvenirText style={{color:"grey"}} text={"|"}/>
              <AvenirText style={{color:"grey"}} text={tutor.distance+"km"}/>
            </View>          
          </View> 
        </TouchableOpacity>
      );
    }  
    return props.tutors.map(tutor => nanny(tutor))
}

const styles = StyleSheet.create({
    nannyItem:{
      width:Layout.window.width*.4,
      height:Layout.window.width*.6,   
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      marginBottom:20,
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