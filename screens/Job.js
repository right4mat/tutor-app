import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage, SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "../components/avenirText";
import AvenirTextBold from "../components/boldText";
import LongText from "../components/longText";
import Loading from "../components/Loading";
import Contact from "../components/Contact";
import Context from "../context/Context";
import moment from "moment";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

import * as WebBrowser from "expo-web-browser";


export default function job({ route, navigation }) {
  const { setJobsConfirm, setJobsUpComing, isStudent } = React.useContext(
    Context
  );

  const date = moment(route.params.job.start).format("LL");
  const start = moment(route.params.job.start).format("hh:mm");
  const finish = moment(route.params.job.finish).format("hh:mm");

  const [loading, setLoading] = React.useState(false);

  const confirmJob = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/confirmjob.php",
        {
          method: "post",
          body: JSON.stringify({
            jobID: route.params.job.jobID,
            isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
            sessionID: await AsyncStorage.getItem("loggedIn"),
            id: route.params.job.id,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.result === "success") {
        setJobsConfirm(result.data["unapproved"]);
        setJobsUpComing(result.data["approved"]);
        setLoading(false);
        navigation.goBack();
      } else {
        alert(result.result);
        setLoading(false);
        return false;
      }
    } catch (e) {
      setLoading(false);
      alert(e);
      return false;
    }
  };

  const cancelJob = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/canceljob.php",
        {
          method: "post",
          body: JSON.stringify({
            jobID: route.params.job.jobID,            
            isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
            sessionID: await AsyncStorage.getItem("loggedIn"),
            id: route.params.job.id,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.result === "success") {
        setJobsConfirm(result.data["unapproved"]);
        setJobsUpComing(result.data["approved"]);
        setLoading(false);
        navigation.goBack();
      } else {
        alert(result.result);
        setLoading(false);
        return false;
      }
    } catch (e) {
      setLoading(false);
      alert(e);
      return false;
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.basicDetails}>
          <View style={styles.details}>
            <View style={styles.detail}>
              <AvenirTextBold
                style={{ fontSize: 16, color: "#373737" }}
                text={"Subject"}
              />
            </View>
            <View style={styles.detail}>
              <AvenirTextBold
                style={{ fontSize: 16, color: "#373737" }}
                text={"Date"}
              />
            </View>
            <View style={styles.detail}>
              <AvenirTextBold
                style={{ fontSize: 16, color: "#373737" }}
                text={"Time"}
              />
            </View>
            <View style={styles.detail}>
              <AvenirTextBold
                style={{ fontSize: 16, color: "#373737" }}
                text={isStudent ? "Tutor" : "Student"}
              />
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.detail}>
              <LongText
                style={{ fontSize: 16, color: "#373737" }}
                text={route.params.job.name}
              />
            </View>
            <View style={styles.detail}>
              <LongText
                style={{ fontSize: 16, color: "#373737" }}
                text={date}
              />
            </View>
            <View style={styles.detail}>
              <LongText
                style={{ fontSize: 16, color: "#373737" }}
                text={start + " - " + finish}
              />
            </View>
            <View style={styles.detail}>
              <LongText
                style={{ fontSize: 16, color: "#373737" }}
                text={
                  route.params.job.first_name + " " + route.params.job.last_name
                }
              />
            </View>
          </View>
          <View style={styles.choices}></View>
        </View>
        <Contact value={route.params.job.phone} icon={"ios-call"} url={"tel:"+route.params.job.phone} />
        <Contact value={route.params.job.email} icon={"ios-mail"} url={"mailto:"+route.params.job.email} />
        <Contact value={route.params.job.address} icon={"md-pin"} />
        <AvenirText
          style={{ fontSize: 20, marginTop: 15 }}
          text={"About the job"}
        />
        <View style={styles.about}>
          <LongText
            style={{ fontSize: 16, lineHeight: 25 }}
            text={route.params.job.about}
          />
        </View>
      </View>
      <View style={styles.profilePic}>
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: undefined,
            aspectRatio: 1,
          }}
          source={{
            uri:
              "https://lsdsoftware.io/abctutors/" +
              (isStudent ? "tutorPhotos" : "studentPhotos") +
              "/large/" +
              route.params.job.id +
              ".jpg",
          }}
        />
      </View>
      <View style={styles.options}>
        {loading ? <Loading /> : false}
        {parseInt(route.params.job.confirmed) || isStudent ? (
          route.params.hideCancel ? (
            false
          ) : (
            <TouchableOpacity
              style={styles.buttonSingle}
              onPress={() => cancelJob(route.params.job.jobID)}
            >
              <Ionicons name={"md-close"} size={40} color="#b60c26" />
              <AvenirText style={{ fontSize: 20 }} text={"Cancel"} />
            </TouchableOpacity>
          )
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => confirmJob(route.params.job.jobID)}
            >
              <Ionicons name={"md-checkmark"} size={40} color="#42c86f" />
              <AvenirText style={{ fontSize: 20 }} text={"Accept"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => cancelJob(route.params.job.jobID)}
            >
              <Ionicons name={"md-close"} size={40} color="#b60c26" />
              <AvenirText style={{ fontSize: 20 }} text={"Reject"} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inner: {
    padding: 15,
  },
  options: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  button: {
    borderColor: "#d3d3d3",
    borderRightWidth: 1,
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  buttonSingle: {
    borderColor: "#d3d3d3",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    width: "50%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  profilePic: {
    height: Layout.window.height * 0.5,
    width: "100%",
    marginBottom: 60,
  },
  about: {
    marginVertical: 15,
  },
  basicDetails: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  detail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 2,
  },
  details: {
    width: "40%",
  },
  choices: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  days: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
});
