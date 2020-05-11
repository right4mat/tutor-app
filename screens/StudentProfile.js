import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Layout from "../constants/Layout";
import AvenirText from "../components/avenirText";
import AvenirTextBold from "../components/boldText";
import Contact from "../components/Contact";
import LongText from "../components/longText";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";
import MapView from "react-native-maps";


export default function TutorProfile({ route, navigation }) {
  const [firstName] = React.useState(route.params.student.firstName);
  const [lastName] = React.useState(route.params.student.lastName);
  const [distance] = React.useState(route.params.student.distance);
  const [subjects, setSubjects] = React.useState(route.params.student.subjects);
  const [lat] = React.useState(parseFloat(route.params.student.lat));
  const [lng] = React.useState(parseFloat(route.params.student.lng));
  const [photo] = React.useState(route.params.student.id);
  const [phone] = React.useState(route.params.student.phone);
  const [email] = React.useState(route.params.student.email);


  //console.warn(route.params.filters)

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.picContainer}>
          <Image
            style={styles.pic}
            source={{
              uri:
                "https://lsdsoftware.io/abctutors/studentPhotos/large/" +
                photo +
                ".jpg",
            }}
          />
        </View>
        <View style={styles.brief}>
          <AvenirTextBold
            style={{ fontSize: 30 }}
            text={firstName + " " + lastName}
          />
        </View>
        
        <View style={styles.skills}>
          <View style={{ marginTop: 50 }}>
            <Contact value={phone} icon={"ios-call"} url={"tel:"+phone} />
            <Contact value={email} icon={"ios-mail"} url={"mailto:"+email} />
            <Distance distance={Math.floor(distance)} />
          </View>
        </View>
        <View style={styles.map}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: lat,
              longitude: lng,
              longitudeDelta: 0.02,
              latitudeDelta: 0.02,
            }}
          >
            <MapView.Circle
              center={{
                latitude: lat,
                longitude: lng,
              }}
              strokeColor="#36d4af"
              fillColor={"rgba(54, 212, 175, 0.5)"}
              radius={400}
            />
          </MapView>
        </View>
      </ScrollView>
      
    </View>
    </SafeAreaView>
  );
}

const Distance = (props) => {
  return (
    <View style={[styles.skill]}>
      <Ionicons
        style={{ marginRight: 15 }}
        name={"md-pin"}
        size={25}
        color={Colors.secondaryLight}
      />
      <AvenirText style={{ fontSize: 20 }} text={props.distance + "kms"} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  picContainer: {
    height: Layout.window.height / 2,
    width: Layout.window.width,
  },
  pic: {
    height: Layout.window.height / 2,
    width: Layout.window.width,
    resizeMode: "cover",
  },
  brief: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  full: {
    padding: 15,
  },
  skills: {
    padding: 15,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  skill: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 15,
    paddingTop: 5,
  },
  mapStyle: {
    flex: 1,
  },
  map: {
    height: Layout.window.height / 3,
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 15,
    padding: 15,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "flex-end",
    minWidth: 100,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
  },
});
