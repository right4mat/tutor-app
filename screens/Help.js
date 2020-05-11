import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Slider,
  Platform,
  ImageBackground,
  Linking,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import AvenirText from "../components/avenirText";
import BoldText from "../components/boldText";
import Contact from "../components/Contact";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as WebBrowser from "expo-web-browser";
import Context from "../context/Context";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";


export default function Help({ route, navigation }) {
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.image}
      >
        <View style={styles.innerContainer}>
          <View style={styles.innerContainerSmall}>
            <BoldText
              style={{ fontSize: 25, marginBottom: 30 }}
              text={"Ask us anything"}
            />
            <TouchableOpacity onPress={()=>WebBrowser.openBrowserAsync(
                  "https://www.abcnannyservices.com.au/online-tutoring"
                )}>
              <AvenirText style={{ fontSize: 20 }} text={"FAQs"} />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainerSmall}>
            <BoldText
              style={{ fontSize: 25, marginBottom: 30 }}
              text={"Contact us at:"}
            />
            <Contact value={"0457980251"} icon={"ios-call"} url={"tel:0457980251"}/>
            <Contact value={"info@abcnannyservices.com"} icon={"ios-mail"} url={"mailto:info@abcnannyservices.com"} />
          </View>
        </View>
      </ImageBackground>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
      flex:1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  innerContainerSmall: {
    marginBottom: 40,
  },
});
