import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "../components/avenirText";
import Colors from "../constants/Colors";
import Context from "../context/Context";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { SendPhoto } from "../services/UserData";

export default function LinksScreen({ navigation }) {
  const { setLoggedIn } = React.useContext(Context);
  const { email } = React.useContext(Context);
  const { firstName } = React.useContext(Context);
  const { lastName } = React.useContext(Context);
  const { photo, setPhoto, isStudent, userID } = React.useContext(Context);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setLoggedIn(false);
    } catch (error) {
      console.warn(error.message);
    }
  };

  const getPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    await getPermission();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        //console.log({ image: result});
      }
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 500 } }], // resize to width of 300 and preserve aspect ratio
        { compress: 0.7, format: "jpeg", base64: true }
      );
      await SendPhoto(resizedPhoto.base64);
      const photoName = userID + ".jpg";
      setPhoto(photoName);
      await AsyncStorage.setItem("photo", photoName);
      console.log(userID);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerBanner}>
        <View onPress={pickImage}>
          <View style={styles.profilePic}>
            {photo ? (
              <Image
                source={{
                  uri: isStudent
                    ? "https://lsdsoftware.io/abctutors/studentPhotos/small/" +
                      photo + "?date=" + Date.now()
                    : "https://lsdsoftware.io/abctutors/tutorPhotos/small/" +
                      photo + "?date=" + Date.now(),
                }}
                style={{ width: 80, height: 80, resizeMode: "cover" }}
              />
            ) : (
              <Ionicons
                name={"md-person"}
                size={50}
                color="rgba(212,175,54,0.7)"
              />
            )}
          </View>
            <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
              <Ionicons
                name={"ios-create"}
                size={16}
                color="rgba(212,175,54,0.7)"
              />
            </TouchableOpacity>
        </View>
        <View style={styles.headerText}>
          <AvenirText
            style={{ fontSize: 40 }}
            text={firstName + " " + lastName[0] + "."}
          />
          <AvenirText style={{ fontSize: 18, color: "#d3d3d3" }} text={email} />
        </View>
      </View>
      <OptionButton
        icon="ios-paper"
        label="My basic Info"
        onPress={() => navigation.navigate("BasicInfo")}
      />
      {isStudent ? (
        <OptionButton
          icon="ios-card"
          label="My card"
          onPress={() => navigation.navigate("CardDetails")}
        /> ) : (false) }

      <OptionButton
        icon="ios-key"
        label="My password"
        onPress={() => navigation.navigate("Password")}
      />

      <OptionButton
        icon="md-calendar"
        label="My sessions"
        onPress={() => navigation.navigate("JobList")}
      />

      {isStudent ? (
        <OptionButton
        icon="ios-cash"
        label="My billing period"
        onPress={() => navigation.navigate("BillingPeriod")}
      />
      ) : (
        <OptionButton
          icon="ios-cash"
          label="My pay period"
          onPress={() => navigation.navigate("PayPeriod")}
        />
      )}

      {isStudent ? (
        <OptionButton
          icon="ios-people"
          label="My tutors"
          onPress={() => navigation.navigate("MyTutors")}
        />
      ) : (
        <OptionButton
          icon="ios-people"
          label="My students"
          onPress={() => navigation.navigate("MyStudents")}
        />
      )}
      
      <OptionButton icon="md-help" label="Help" onPress={() => navigation.navigate("Help")} />
      <OptionButton icon="ios-log-out" label="Logout" onPress={logout} />

      <OptionButton
        icon="ios-trash"
        label="Delete account"
        onPress={() => alert("this will delete your account")}
        isLastOption
      />
    </ScrollView>
    </SafeAreaView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={styles.optionContainer}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={30} color={Colors.secondaryLight} />
        </View>
        <View style={styles.optionTextContainer}>
          <AvenirText style={styles.optionText} text={label} />
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  optionContainer: {
    flexDirection: "row",
    borderTopColor: "#d3d3d3",
    borderBottomColor: "#d3d3d3",
    borderTopWidth: 0.5,

    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  option: {
    backgroundColor: "#fff",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginTop: 1,
  },
  headerBanner: {
    height: 80,
    marginBottom: 40,
    marginTop: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  profilePic: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "rgba(212,175,54,.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  editIcon: {
    position: "absolute",
    top: 50,
    left: 50,
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(212,175,54,1)",
    borderRadius: 30 / 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    width: "70%",
  },
});
