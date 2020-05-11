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
  RefreshControl,
  SafeAreaView
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
import Layout from "../constants/Layout";
import { Tutors } from "../components/Tutors";
import moment from "moment";

import Context from "../context/Context";

import Constants from "expo-constants";
//import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [days, setDays] = React.useState(GetDates(new Date(), 7));
  const [date] = React.useState(new Date());
  const [start] = React.useState(moment().startOf("hour"));
  const [finish] = React.useState(
    moment(moment().startOf("hour")).add(1, "hour")
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const [tutors, setTutors] = React.useState({});
  const { location, setLocation } = React.useContext(Context);

  const getClose = async () => {
    try {
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/getclose.php",
        {
          method: "post",
          body: JSON.stringify(await payload()),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.result === "success") {
        //console.warn(result.data);
        setTutors(result.data);
      } else {
        alert(result.result);
        return false;
      }
    } catch (e) {
      alert(e);
      return false;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    console.log("chicken");
    getClose().then(() => setRefreshing(false));
  };

  const payload = async () => {
    return {
      location: location,
      sessionID: await AsyncStorage.getItem('loggedIn'),
      start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
      finish: moment(finish).format("YYYY-MM-DD HH:mm:ss"),
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
    };
  };

  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) getClose();
    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <BrandText style={styles.headerText} text={"ABC NANNY SERVICES (Tutoring)"} />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Filters", {
              date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
            })
          }
        >
          <Ionicons name={"ios-search"} size={30} color="#373737" />
        </TouchableOpacity>
      </View>
      <ScrollView
      style={{flex:1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.banner}>
          <Image
            style={styles.nannyThumb}
            source={require("../assets/images/tutorIcon.png")}
          />
          <View style={styles.bannerInner}>
            <LongText
              style={{ flex: 1, flexWrap: "wrap", color: "#fff" }}
              text={"Delivering professional tutoring to support your learning"}
            />
            <TouchableOpacity
              style={styles.bannerHeader}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.abcnannyservices.com.au/"
                )
              }
            >
              <AvenirText style={{ color: "#fff" }} text={"NEED A NANNY?"} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.textBox}>
            <AvenirText
              style={styles.textBoxText}
              text={"I need a tutor on the..."}
            />
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.calender}
          >
            {days.map((x) => {
              return (
                <CalenderDay
                  date={x[1]}
                  day={x[0]}
                  payload={{
                    date: moment(x[x.length - 1]).format("YYYY-MM-DD HH:mm:ss"),
                  }}
                />
              );
            })}
            <TouchableOpacity
              style={styles.calenderItem}
              onPress={() =>
                navigation.navigate("Filters", {
                  date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
                })
              }
            >
              <Ionicons name={"ios-add"} size={50} color="#d3d3d3" />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View>
          <View style={styles.textBox}>
            <AvenirText style={styles.textBoxText} text={"Tutors near by"} />
          </View>
          <View style={styles.tutors}>
            {Object.keys(tutors).length ? (
              <Tutors tutors={tutors} filters={payload()} />
            ) : (
              false
            )}
          </View>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
    paddingTop:5
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
    backgroundColor: "#231f20",
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
  calender: {
    borderRadius: 10,
    height: 70,
  },
  tutors: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
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
    fontSize: 20,
  },
  calenderItem: {
    width: 65,
    height: 60,
    marginLeft: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  bannerHeader: {
    flex: 1,
    backgroundColor: Colors.primary,
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
});
