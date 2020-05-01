import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
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

const getSubjects = async (handler, id) => {
  try {
    const response = await fetch(
      "https://lsdsoftware.io/abctutors/tutorsubjects.php",
      {
        method: "post",
        body: JSON.stringify({ id: id }),
      }
    );

    const result = await response.json();

    if (result.result === "success") {
      //console.warn(result.data);
      handler(result.data);
    } else {
      alert(result.result);
      return false;
    }
  } catch (e) {
    alert(e);
    return false;
  }
};

export default function TutorProfile({ route, navigation }) {
  const [firstName] = React.useState(route.params.tutor.firstName);
  const [lastName] = React.useState(route.params.tutor.lastName);
  const [distance] = React.useState(route.params.tutor.distance);
  const [age] = React.useState(route.params.age);
  const [subjects, setSubjects] = React.useState(route.params.tutor.subjects);
  const [lat] = React.useState(parseFloat(route.params.tutor.lat));
  const [lng] = React.useState(parseFloat(route.params.tutor.lng));
  const [price] = React.useState(route.params.tutor.price);
  const [photo] = React.useState(route.params.tutor.id);
  const [phone] = React.useState(route.params.tutor.phone);
  const [email] = React.useState(route.params.tutor.email);

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) getSubjects(setSubjects, route.params.tutor.id);
    return () => {
      isCancelled = true;
    };
  }, []);

  //console.warn(route.params.filters)

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.picContainer}>
          <Image
            style={styles.pic}
            source={{
              uri:
                "https://lsdsoftware.io/abctutors/tutorPhotos/large/" +
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
          <AvenirText style={{ fontSize: 20 }} text={"$" + price + "/h"} />
        </View>
        <View style={styles.full}>
          <LongText
            style={{ fontSize: 18, lineHeight: 30 }}
            text={
              "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          />
        </View>
        
        <View style={styles.skills}>
          {Object.keys(subjects).map((subject) => {
            return (
              <Skill
                details={subjects[subject]}
                icon={Icons[subject]}
                subject={subject}
              />
            );
          })}
          <TouchableOpacity style={styles.timetable} onPress={()=>navigation.navigate('Timetable', route.params.tutor)}>
            <AvenirText style={{ fontSize: 16 }} text={"View group times"} />
            <Ionicons
              style={{ marginLeft: 15 }}
              name={"ios-arrow-round-forward"}
              size={30}
              color={Colors.secondaryLight}
            />
          </TouchableOpacity>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Hire", {
            opts: route.params,
            subjects: subjects,
          })
        }
      >
        <AvenirText style={styles.buttonText} text={"Hire"} />
      </TouchableOpacity>
    </View>
  );
}

const Skill = (props) => {
  return (
    <View style={styles.skill}>
      <View style={styles.skill}>
        <Ionicons
          style={{ marginRight: 15 }}
          name={props.icon}
          size={25}
          color={Colors.primaryLight}
        />
        <AvenirText style={{ fontSize: 16 }} text={props.subject} />
      </View>
      <View style={styles.skill}>
        <AvenirText style={{ marginRight: 15 }} text={"tutors: "} />
        <AvenirText text={joinDetails(props.details)} />
      </View>
    </View>
  );
};

const joinDetails = (obj) => {
  let result = [];
  Object.keys(obj).forEach((detail) => {
    if (obj[detail] === "1") result.push(detail);
  });
  return result.join(",  ");
};

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
  timetable:{
    paddingTop:30,
    display:"flex",
    justifyContent:"flex-start",
    alignContent:"center",
    flexDirection:"row"
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
