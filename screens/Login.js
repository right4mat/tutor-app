import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage,
  SafeAreaView
} from "react-native";

import AvenirText from "../components/avenirText";
import BoldText from "../components/boldText";
import BrandText from "../components/brandText";
import LongText from "../components/longText";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Loading from "../components/Loading";

import Context from "../context/Context"; 
import * as WebBrowser from "expo-web-browser";

import { login, registerForPushNotificationsAsync } from "../services/Login";
import { BaseRouter } from "@react-navigation/native";

export default function Login({ route, navigation }) {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setPossibleEmail] = React.useState("");

  const {
    loggedIn,
    setLoggedIn,
    setFirstName,
    setPhoto,
    setLastName,
    setPhone,
    setEmail,
    setLocation,
    setAddress,
    setIsStudent,
    setUserID,
    setLastFour,
    setAbout
  } = React.useContext(Context);

  const attemptLogin = async (payload) => {
    payload["isStudent"] = route.params.isStudent;
    setIsLoggingIn(true);
    const result = await login(payload);
    if (result) {
      SetAppState(result);
      setIsStudent(route.params.isStudent);
      await AsyncStorage.setItem(
        "isStudent",
        JSON.stringify(route.params.isStudent)
      );
      registerForPushNotificationsAsync();
      setLoggedIn(true);
    } else {setIsLoggingIn(false); navigation.goBack()};
  };

  const SetAppState = (payload) => {
    setFirstName(payload.firstName || "none");
    setLastName(payload.lastName || "none");
    setPhone(payload.phone || "none");
    setEmail(payload.email || "none");
    setLocation(payload.location || { lat: 0, lng: 0 });
    setAddress(payload.address || "none");
    setUserID(payload.id || "none");
    setPhoto(payload.id + ".jpg" || "none");
    setLastFour(payload.lastFour || ". . . .");
    setAbout(payload.about || false);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {isLoggingIn ? <Loading /> : false}
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.login}>
            {route.params.isStudent ? (
              <BoldText
                style={{
                  fontSize: 25,
                  width: Layout.window.width * 0.8,
                  marginBottom: 15,
                }}
                text={
                  "“The only person who is educated is the one who has learned how to learn„"
                }
              />
            ) : (
              <BoldText
                style={{
                  fontSize: 25,
                  width: Layout.window.width * 0.8,
                  marginBottom: 15,
                }}
                text={
                  "“The good teacher explains. The superior teacher demonstrates. The great teacher inspires„"
                }
              />
            )}
            <TextInput
            returnKeyType='done'
              style={styles.textInput}
              placeholder="Email"
              autoCompleteType="email"
              value={email}
              autoCapitalize = 'none'
              onChangeText={(text) => setPossibleEmail(text.toLowerCase())}
            />
            <TextInput
            returnKeyType='done'
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="Password"
              password={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => attemptLogin({ email: email, pass: password })}
            >
              <AvenirText style={styles.buttonText} text={"Login"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{paddingHorizontal:15}} onPress={()=> WebBrowser.openBrowserAsync(
                  "https://abc-nanny-services.flycricket.io/privacy.html"
                )}>
            <LongText
              style={{ color: "grey" }}
              text={
                "If you continue you declare you have read and accepted the Disclaimer and Privacy Policy"
              }
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,.9)",
    padding: 0,
    margin: 0,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },

  textInput: {
    padding: 10,
    height: 50,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: Layout.window.width * 0.8,
  },
  button: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    width: 200,
  },
  buttonFB: {
    backgroundColor: "#3b5998",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: 250,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
  },
  buttonTextGold: {
    alignSelf: "center",
    fontSize: 18,
    color: Colors.primary,
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
