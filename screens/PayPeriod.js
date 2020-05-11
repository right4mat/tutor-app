import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "../components/avenirText";
import AvenirTextBold from "../components/boldText";
import Context from "../context/Context";
import moment from "moment";
import Colors from "../constants/Colors";

export default function PayPeriod({ navigation }) {
  const [start, setStart] = React.useState("");
  const [finish, setFinish] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [approveAmount, setApproveAmount] = React.useState("");

  const getPayPeriod = async () => {
    try {
      const response = await fetch(
        "https://lsdsoftware.io/abctutors/payperiod.php",
        {
          method: "post",
          body: JSON.stringify({
            sessionID: await AsyncStorage.getItem("loggedIn"),
            isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
          }),
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setStart(result.data.start);
        setFinish(result.data.finish);
        setAmount("$" + result.data.amount);
        setApproveAmount("$" + result.data.approvedAmount);
      } else {
        alert(result.result);
        return false;
      }
    } catch (e) {
      alert(e);
      navigation.goBack();
      return false;
    }
  };

  React.useEffect(() => {
    getPayPeriod();
  }, []);

  // const start = moment(job.start).format("hh:mm");
  // const finish = moment(job.finish).format("hh:mm");

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>

      <TouchableOpacity style={styles.pay}>
        <View style={styles.details}>
          <View style={styles.detail}>
            <AvenirTextBold
              style={{ fontSize: 16, color: "#373737" }}
              text={"Start date"}
            />
          </View>
          <View style={styles.detail}>
            <AvenirTextBold
              style={{ fontSize: 16, color: "#373737" }}
              text={"Finish date"}
            />
          </View>
          <View style={styles.detail}>
            <AvenirTextBold
              style={{ fontSize: 16, color: "#373737" }}
              text={"Amount"}
            />
          </View>
          <View style={styles.detail}>
            <AvenirTextBold
              style={{ fontSize: 16, color: "#373737" }}
              text={"Approved amount"}
            />
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detail}>
            <AvenirText
              style={{ fontSize: 16, color: "#373737" }}
              text={start}
            />
          </View>
          <View style={styles.detail}>
            <AvenirText
              style={{ fontSize: 16, color: "#373737" }}
              text={finish}
            />
          </View>
          <View style={styles.detail}>
            <AvenirText
              style={{ fontSize: 16, color: "#373737" }}
              text={amount}
            />
          </View>
          <View style={styles.detail}>
            <AvenirText
              style={{ fontSize: 16, color: "#373737" }}
              text={approveAmount}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    fontSize: 30,
    marginBottom: 40,
  },
  pay: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#d3d3d3",
    paddingVertical: 5,
  },
  detail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 2,
  },
  details: {
    width: "50%",
  },
  choices: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});
