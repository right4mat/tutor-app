import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import AvenirText from "../components/avenirText";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Context from "../context/Context";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";

export default function Hire({ route, navigation }) {
  const [about, setAbout] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [tutorName] = React.useState(route.params.name);
  const { firstName } = React.useContext(Context);

  const hire = async () => {
    if(subject ==''){
      alert("You need to pick a subject")
      return false;
    }
    if(about ==''){
      alert("Please explain to "+tutorName+" a bit about your session.")
      return false;
    }

    try {
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/hire.php",
        {
          method: "post",
          body: JSON.stringify({
            date: route.params.date,
            start: route.params.start,
            finish: route.params.finish,
            subject: subject,
            tutorID: route.params.tutorID,
            about: about,
            group: route.params.group,
            sessionID: await AsyncStorage.getItem("loggedIn"),
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.result === "success") {
        //console.warn(result.data);
        alert(
          "Booking complete!\n This wont be added to your billing until " +
            tutorName +
            " accepts the session"
        );
        navigation.navigate("HomeScreen");
      } else {
        alert(result.result);
        navigation.goBack();

        return false;
      }
    } catch (e) {
      navigation.goBack();
      alert(e);
      return false;
    }
  };

  const Subject = (props) => {
    return (
      
      <TouchableOpacity
        style={[
          styles.subject,
          props.state === props.id
            ? { backgroundColor: Colors.secondaryLight }
            : false,
        ]}
        onPress={() => props.setState(props.id)}
      >
        <View style={styles.subjectInner}>
          <Ionicons
            name={props.icon}
            size={22}
            color={props.state === props.id ? "#fff" : Colors.primaryLight}
          />
          <AvenirText style={styles.buttonTextCard} text={props.title} />
        </View>
        <View>
          <Ionicons
            name={
              props.state === props.id
                ? "ios-checkmark-circle"
                : "ios-radio-button-off"
            }
            size={22}
            color={props.state === props.id ? "#fff" : Colors.primaryLight}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          <AvenirText style={{ marginBottom: 15 }} text={"Which subject?"} />

          {Object.keys(route.params.subjects).map((x) => (
            <Subject
              state={subject}
              setState={setSubject}
              title={x}
              icon={Icons[x]}
              id={route.params.subjects[x].id}
            />
          ))}
          <AvenirText
            style={{ fontSize: 16, marginVertical: 30 }}
            text={"Tell " + tutorName + " a little bit about your situation."}
          />
          <TextInput
          returnKeyType='done'
            style={styles.textInput}
            multiline={true}
            numberOfLines={20}
            maxLength={300}
            onChangeText={(text) => setAbout(text)}
            value={about}
            placeholder={"Hello " + tutorName + ", im looking for help with..."}
          />
          <TouchableOpacity style={styles.button} onPress={() => hire()}>
            <AvenirText style={styles.buttonText} text={"Finish"} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  textInput: {
    padding: 15,
    minHeight: "30%",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
  },

  subjectInner: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  subject: {
    padding: 10,
    height: 50,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  button: {
    marginTop: 40,
    padding: 15,
    width: 100,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "flex-end",
    backgroundColor: Colors.primaryLight,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
  },

  buttonTextCard: {
    //alignSelf: 'center',
    marginHorizontal: 15,
    fontSize: 18,
    color: "#000",
  },
});
