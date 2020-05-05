import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ShadowPropTypesIOS,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "../components/avenirText";
import AvenirTextBold from "../components/boldText";
import Context from "../context/Context";
import moment from "moment";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";

export default function PayPeriod({ route, navigation }) {
  const [timetable, setTimetable] = React.useState({});

  const getTimetable = async () => {
    try {
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/timetable.php",
        {
          method: "post",
          body: JSON.stringify({
            sessionID: await AsyncStorage.getItem("loggedIn"),
            tutorID: route.params.id,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.result === "success") {
        setTimetable(result.data);
      } else {
        alert(result.result);
        return false;
      }
    } catch (e) {
      alert(e);
      return false;
    }
  };

  React.useEffect(() => {
    getTimetable();
  }, []);

  const Subject = (props) => {
      console.log(props.id)
    return (
      <View style={{paddingVertical:15}}>
        <View style={styles.subjectHeader}>
          <Ionicons
            style={{ marginRight: 15 }}
            name={Icons[props.name]}
            size={30}
            color={Colors.secondaryLight}
          />
          <AvenirText  style={{fontSize:18}}  text={props.name} />
        </View>
        {props.times.map((time) => {
          return (
            <View style={styles.subjectDetails}>
              <View style={{marginRight:15}}>
                <AvenirTextBold style={{fontSize:16}} text={"Day:"} />
                <AvenirTextBold style={{fontSize:16}}  text={"Time:"} />
              </View>
              <View>
                <AvenirText style={{fontSize:16}}  text={time.day} />
                <AvenirText  style={{fontSize:16}} text={time.start + " - " + time.finish} />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.keys(timetable).map((subject) => {
          return (
            <Subject
              name={subject}
              times={timetable[subject]}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  subjectHeader:{
    width:"100%",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row",
    borderColor:"#d3d3d3",
    borderBottomWidth:1,
    marginBottom:15
  },
  subjectDetails:{
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row"
  },
  header: {
    fontSize: 30,
    marginBottom: 40,
  },
  pay: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#d3d3d3",
    paddingVertical: 5,
  },
  detail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 2,
  },
  details: {
    width: "50%",
  },
  choices: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
