import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Tutors } from '../components/Tutors';

import Loading from '../components/Loading';

const fetchFiltered = async (handler, filters) => {
  const response = await fetch(
    "https://sydney.wextg.com/lsdsoftware/abctutors/filter.php",
    {
      method: "post",
      body: JSON.stringify(filters),
    }
  );

  const result = await response.json();

    //console.warn(result)

  if (result.result === "success") {
    //console.warn(result.data);
    handler(result.data);
  } else {
    //console.warn(result.data);
    alert(result.result);
    return false;
  }

};

export default function SearchResults({route}) {
    
    const [tutors, setTutors] = React.useState({})

    //console.warn(route.params)

    React.useEffect(() => {
      setTimeout(()=>{
        fetchFiltered(setTutors, route.params);
      }, 1000)
      
      
  
    }, [])



  return (
    <View style={styles.container} >

        {Object.keys(tutors).length ? <Tutors tutors={tutors} filters={route.params}/> : <Loading/>}


    </View>
  );
}



const styles = StyleSheet.create({
  container: {
      paddingHorizontal:15,
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