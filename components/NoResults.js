
import { Ionicons } from "@expo/vector-icons";
import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import AvenirText from '../components/avenirText';

export default function NoResults() {



  return (
    <View style={styles.container}>
        <Ionicons name={"md-sad"} size={100} color={Colors.primaryLight} />
        <AvenirText
              style={styles.textBoxText}
              text={"No tutors found..."}
        />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor: "#fff",
  },

  
});
