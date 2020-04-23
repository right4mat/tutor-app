import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { GetDates, CalenderDay } from "../components/calenderStrip";
import AvenirText from "../components/avenirText";
import BrandText from "../components/brandText";
import LongText from "../components/longText";
import * as WebBrowser from "expo-web-browser";
import Colors from "../constants/Colors";
import Jobs from "../components/Jobs";

import Context from "../context/Context";





export default function HomeScreen({ navigation }) {

  const{firstName} = React.useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <BrandText style={styles.headerText} text={"ABC Tutor Services"} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Filters")}>
          <Ionicons name={"ios-search"} size={30} color="#373737" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Image
            style={styles.nannyThumb}
            source={require("../assets/images/tutorIcon.png")}
          />
          <View style={styles.bannerInner}>
            <LongText
              style={{ flex: 1, fontSize: 20, flexWrap: "wrap", color: "#fff", textAlign:"center"}}
              text={"Welcome "+firstName+' !'}
            />
            <TouchableOpacity
              style={styles.bannerHeader}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.abcnannyservices.com.au/"
                )
              }
            >
              <AvenirText style={{ color: "#373737" }} text={"Want to be a nanny?"} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
            <Jobs navigation={navigation}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  contentContainer: {
    paddingTop: 10,
  },
  logo: {
    width: 70,
    height: 58,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
  },
  banner: {
    borderRadius: 10,
    height: 100,
    backgroundColor: Colors.secondary,
    padding: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  bannerInner: {
    width: "60%",
    height: "100%",
  },
  bannerLogo: {
    resizeMode: "contain",
    height: "100%",
  },
  textBox: {
    marginBottom: 20,
    marginTop: 20,
  },
  textBoxText: {
    color: "#373737",
    fontSize: 16,
  },
  headerText: {
    color: Colors.primary,
    fontWeight: "800",
    fontSize: 30,
  },
  bannerHeader: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nannyThumb: {
    width: undefined,
    height: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  sessionsHeader:{
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center',
      flexDirection:'row',
      marginVertical:15
  }
});
