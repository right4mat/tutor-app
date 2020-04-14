import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Image, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import LongText from '../components/longText';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import MapView from 'react-native-maps';

export default function TutorProfile({ route, navigation}) {

    const[firstName] = React.useState(route.params.firstName);
    const[lastName] = React.useState(route.params.lastName);
    const[distance] = React.useState(route.params.distance);
    const[age] = React.useState(route.params.age);
    const[skills] = React.useState(route.params.skills);
    const[location] = React.useState(route.params.location)
    const[price] = React.useState(route.params.price)
    




  return (
    <View style={styles.container}>
        <ScrollView style={{flex:1}} >
            <View style={styles.picContainer}>
                <Image
                style={styles.pic}
                source={require('../assets/images/tutorPic.jpg')}
                />
            </View>
            <View style={styles.brief}>
                <AvenirTextBold style={{fontSize:30}} text={firstName+' '+lastName}/>
                <AvenirText style={{fontSize:20}} text={'$'+price+"/h"}/>        
            </View>
            <View style={styles.full}>
                <LongText style={{fontSize:18, lineHeight: 30}} text={"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}/>
            </View>
            <View style={styles.skills}>
                {Object.keys(skills).map((skill) => {
                    return <Skill skills={skills} icon={Icons[skill]} skill={skill}/>
                })}
                <Distance distance={30}/>
            </View>
            <View style={styles.map}>
                <MapView style={styles.mapStyle} region={{
                            latitude: location[0],
                            longitude: location[1],
                            longitudeDelta:0.02,
                            latitudeDelta:0.02
                        }}>
                    <MapView.Marker
                        coordinate={{
                            latitude: location[0],
                            longitude: location[1],
                        }}
                    />
                </MapView>
            </View>
                        


        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Hire', {name: firstName+' '+lastName})} >
                <AvenirText style={styles.buttonText} text={"Hire"}/>
        </TouchableOpacity>
    </View>
  );
}

const Skill = (props) =>{
    return (
    <View style={styles.skill}>
        <View style={styles.skill}>
            <Ionicons style={{marginRight:15}} name={props.icon} size={25} color={Colors.primaryLight} />
            <AvenirText style={{fontSize:16}} text={props.skill}/> 
        </View>
        <View style={styles.skill}>
            <AvenirText style={{marginRight:15}} text={"years: "}/>
            <AvenirText  text={props.skills[props.skill].join()}/> 
        </View>
    </View>
    );
}




const Distance = (props) =>{
    return (
    <View style={[styles.skill, {marginTop:50}]}>
        <Ionicons style={{marginRight:15}} name={"md-pin"} size={25} color={Colors.secondaryLight} />
        <AvenirText style={{fontSize:20}} text={props.distance+"kms"}/> 
    </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    picContainer:{
        height: Layout.window.height/2,
        width: Layout.window.width,
    },
    pic:{
        height: Layout.window.height/2,
        width: Layout.window.width,
        resizeMode:"cover"
    },
    brief:{
        padding:15,
        display:'flex',
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    full:{
        padding:15,
    },
    skills:{
        padding:15,
        width:"100%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"column"
    },
    skill:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        paddingRight:15,
        paddingTop:5
    },
    mapStyle:{
        flex:1
    },
    map:{
        height: Layout.window.height/3
    },
    button:{
        position:'absolute',
        bottom: 30,
        right:15,
        padding:15,
        borderRadius: 30,
        overflow: "hidden",
        alignSelf: 'flex-end',
        minWidth: 100,
        backgroundColor: Colors.secondary
    },
    buttonText:{
    alignSelf: 'center',
    fontSize: 18,
    color: "#fff"
    },

 });