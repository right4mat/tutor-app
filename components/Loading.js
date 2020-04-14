
import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

export default function Loading() {



  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    position:"absolute",
    top:0,
    left:0,
    height:"100%",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    backgroundColor: "#fff",
    margin:0,
    zIndex:999
  },

  
});
