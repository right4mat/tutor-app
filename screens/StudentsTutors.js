import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "../components/avenirText";

import Context from "../context/Context";
import Colors from "../constants/Colors";

import { UpdateUser } from "../services/UserData";

export default function StudentsTutors({ navigation }) {
  const { isStudent, location } = React.useContext(Context);

  const [users, setUsers] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.log("chicken");
    getUsers().then(() => setRefreshing(false));
  };

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/tutorsstudents.php",
        {
          method: "post",
          body: JSON.stringify({
            location: location,
            isStudent: isStudent,
            sessionID: await AsyncStorage.getItem("loggedIn"),
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.result === "success") {
        setUsers(Object.keys(result.data).map((tutor) => result.data[tutor]));
      } else {
        alert(result.result);
      }
    } catch (e) {
      navigation.goBack();
      alert(e);
      return false;
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const Student = (props) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate("StudentProfile", {
            student: props.student,
            filters: {},
          })
        }
      >
        <View style={styles.listItemLeft}>
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{
                uri:
                  "https://lsdsoftware.io/abctutors/studentPhotos/small/" +
                  props.student.id +
                  ".jpg",
              }}
            />
          </View>
          <AvenirText
            style={{ fontSize: 18 }}
            text={props.student.firstName + " " + props.student.lastName}
          />
        </View>
        <Ionicons
          name={"md-arrow-dropright"}
          size={30}
          color={Colors.secondaryLight}
        />
      </TouchableOpacity>
    );
  };

  const Tutor = (props) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() =>
          navigation.navigate("TutorProfile", {
            tutor: props.tutor,
            filters: {},
          })
        }
      >
        <View style={styles.listItemLeft}>
          <View style={styles.profilePicContainer}>
            <Image
              style={styles.profilePic}
              source={{
                uri:
                  "https://lsdsoftware.io/abctutors/tutorPhotos/small/" +
                  props.tutor.id +
                  ".jpg",
              }}
            />
          </View>
          <AvenirText
            style={{ fontSize: 18 }}
            text={props.tutor.firstName + " " + props.tutor.lastName}
          />
        </View>
        <Ionicons
          name={"md-arrow-dropright"}
          size={30}
          color={Colors.secondaryLight}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!isStudent ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={users}
          renderItem={({ item }) => <Student student={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={users}
          renderItem={({ item }) => <Tutor tutor={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  profilePicContainer: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    marginRight: 15,
  },
  profilePic: {
    resizeMode: "cover",
    flex: 1,
    borderRadius: 60 / 2,
  },
  listItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "#d3d3d3",
    borderBottomColor: "#d3d3d3",
    borderTopWidth: 0.5,

    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  listItemLeft: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",

    width: "80%",
  },
});
