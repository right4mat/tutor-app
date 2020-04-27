import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity, AsyncStorage, FlatList} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AvenirText from '../components/avenirText';
import AvenirTextBold from '../components/boldText';
import Colors from '../constants/Colors';

import moment from 'moment';

const getConfirmedJobs = async (handler) => {
  const response = await fetch(
    "https://lsdsoftware.io/abctutors/confirmedjobs.php",
    {
      method: "post",
      body: JSON.stringify({sessionID: await AsyncStorage.getItem('loggedIn')}),
    }
  );

  const result = await response.json();

  //console.log(result)

  if (result.result === "success") {
    console.log(result.data);
    handler(result.data);
  } else {
    alert(result.result);
    return false;
  }
};


export default function EnterCard() {
    
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(()=>{
        getConfirmedJobs(setJobs);
        
    },[])

    //setTimeout( ()=>console.log(jobs), 4000);

    
    const Job = ({job}) =>{
        //console.log(job)
        const date = moment(job.start).format('LL');
        const start = moment(job.start).format("hh:mm");
        const finish = moment(job.finish).format("hh:mm");
        return (            
            <TouchableOpacity style={styles.container}>
                <View style={styles.details}>
                    <View style={styles.detail}>
                        <AvenirTextBold style={{fontSize:16, color:"#373737"}} text={"Subject"} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirTextBold style={{fontSize:16, color:"#373737"}} text={"Date"} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirTextBold style={{fontSize:16, color:"#373737"}} text={"Time"} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirTextBold style={{fontSize:16, color:"#373737"}} text={"Student"} />
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.detail}>
                        <AvenirText style={{fontSize:16, color:"#373737"}} text={job.name} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirText style={{fontSize:16, color:"#373737"}} text={date} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirText style={{fontSize:16, color:"#373737"}} text={start+' - '+finish} />
                    </View>
                    <View style={styles.detail}>
                        <AvenirText style={{fontSize:16, color:"#373737"}} text={job.first_name+' '+job.last_name} />
                    </View>
                </View>
                <View style={styles.choices}>
                    <View style={styles.days}>
                        <AvenirText style={{fontSize:30, color:Colors.primary}} text={job.days} />
                        <AvenirText style={{fontSize:18, color:"#373737"}} text={"Days away"} />
                    </View>
                </View>               
            </TouchableOpacity>
            
        )
    }




    return (
                   
        <>
        {jobs.length ? <FlatList numColumns={1}
            data={jobs}
            renderItem={
                ({item}) => <Job job={item}/>
            }/>: <AvenirText style={{ fontSize: 18, color: "#d3d3d3", marginLeft:15 }} text={"No sessions up coming"} />}
        </>


    );
}


//{jobs.length ?  Job(jobs): <AvenirText style={{ fontSize: 18, color: "#d3d3d3", marginLeft:15 }} text={"No sessions to confirm"} />}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    borderTopWidth:1,
    borderColor:"#d3d3d3",
    paddingVertical:5

  },
  detail:{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
      paddingVertical:2
  },
  details:{
      width:"30%",
  },
  choices:{
      flex:1,
       display:"flex",
      justifyContent:"space-around",
      alignItems:"center",
      flexDirection:"row"
  },
  days:{

    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"column"

  }
  
 
});
