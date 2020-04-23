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
import {Tutors } from "../components/Tutors";
import moment from "moment"; 

import Context from "../context/Context";

const payload = (date, location) =>{

  return {

    opts:{
        location:location,
        distance:10,
        yeark2:true,
        year36:true,
        year710:true,
        year1112:true,
        solo:true,
        group:true,
        start:moment().startOf('hour'),
        finish:moment(moment().startOf('hour')).add(1, 'hour'),
        date:date
    },


    subjects:{
        
        1:true,
        2:true,
        3:true,
        4:true,
        5:true,
        6:true,
        6:true,
        7:true,
        8:true,
        9:true,

        10:true,
        11:true,
        12:true,
        13:true,
        14:true,
        15:true,
        16:true,
        17:true,
        18:true,

        20:true,
        21:true,
        22:true,
        23:true,
        24:true,
        25:true,
        26:true,
        27:true,
        28:true,
        29:true,
        30:true,
        31:true
    }
  }
}



const getClose = async (handler, location) => {
  const date = moment();
  const data = payload(date, location)
  const response = await fetch(
    "https://sydney.wextg.com/lsdsoftware/abctutors/filter.php",
    {
      method: "post",
      body: JSON.stringify(data),
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
};

export default function HomeScreen({ navigation }) {
  const [slide, setSlide] = React.useState(new Animated.Value(0));
  const [days, setDays] = React.useState(GetDates(new Date(), 7));
  const [tutors, setTutors] = React.useState({});
  const { location } = React.useContext(Context);

  React.useEffect(() => {
    let isCancelled = false;
    if(!isCancelled)
      getClose(setTutors, location);
    return () => {
        isCancelled = true;
    };
  }, []);
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
              <AvenirText style={{ color: "#373737" }} text={"Need a nanny?"} />
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
              return <CalenderDay date={x[1]} day={x[0]} payload={payload(x[x.length-1], location)} />;
            })}
            <TouchableOpacity
              style={styles.calenderItem}
              onPress={() => navigation.navigate("Filters")}
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
            {Object.keys(tutors).length ? <Tutors tutors={tutors} /> : false}
          </View>
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
    fontSize: 30,
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
});
