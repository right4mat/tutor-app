import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import AvenirText from "../components/avenirText";
import Colors from "../constants/Colors";

const Contact = (props) => {
   const handlePress = (url) =>{
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)

      }
    }).catch(err => console.error('An error occurred', err))
  }
  return (
    <TouchableOpacity style={[styles.skill, { marginBottom: 15 }]} onPress={()=>handlePress(props.url)}>
      <Ionicons
        style={{ marginRight: 15 }}
        name={props.icon}
        size={25}
        color={Colors.secondary}
      />
      <AvenirText style={{ fontSize: 18 }} text={props.value} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    skill: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      paddingRight: 15,
      paddingTop: 5,
    },
  });

  export default Contact;