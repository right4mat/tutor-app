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
  Alert,
  ActivityIndicator,
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import AvenirText from "./avenirText";
import AvenirTextBold from "./boldText";
import Loading from "./Loading";
import Colors from "../constants/Colors";

import { Notifications } from "expo";
import Context from "../context/Context";

import moment from "moment";

const getJobs = async (handlerA, handlerB, handlerC) => {
  const response = await fetch("https://lsdsoftware.io/abctutors/jobs.php", {
    method: "post",
    body: JSON.stringify({
      sessionID: await AsyncStorage.getItem("loggedIn"),
      isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
    }),
  });

  const result = await response.json();

  console.log(result);

  if (result.result === "success") {
    console.log(result.data);
    handlerA(result.data["unapproved"]);
    handlerB(result.data["approved"]);
    handlerC(result.data["past"]);
  } else {
    alert(result.result);
    return false;
  }
};

const acceptJob = async (job, handlerA, handlerB, handlerC, handlerD) => {
  handlerD(true);
  const response = await fetch(
    "https://lsdsoftware.io/abctutors/confirmjob.php",
    {
      method: "post",
      body: JSON.stringify({
        jobID: job.jobID,
        id: job.id,
        sessionID: await AsyncStorage.getItem("loggedIn"),
        isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
      }),
    }
  );

  const result = await response.json();

  console.log(result);

  if (result.result === "success") {
    handlerA(result.data["unapproved"]);
    handlerB(result.data["approved"]);
    handlerC(result.data["past"]);
    handlerD(false);
  } else {
    alert(result.result);
    handlerD(false);
    return false;
  }
};

const rejectJob = async (job, handlerA, handlerB, handlerC, handlerD) => {
  handlerD(true);
  const response = await fetch(
    "https://lsdsoftware.io/abctutors/canceljob.php",
    {
      method: "post",
      body: JSON.stringify({
        jobID: job.jobID,
        id: job.id,
        sessionID: await AsyncStorage.getItem("loggedIn"),
        isStudent: JSON.parse(await AsyncStorage.getItem("isStudent")),
      }),
    }
  );

  const result = await response.json();

  console.log(result);

  if (result.result === "success") {
    handlerA(result.data["unapproved"]);
    handlerB(result.data["approved"]);
    handlerC(result.data["past"]);
    handlerD(false);
  } else {
    alert(result.result);
    handlerD(false);
    return false;
  }
};

const confirm = (job, handlerA, handlerB, handlerC, handlerD) => {
  Alert.alert("Confirm", "Are you sure you want to confirm this session?", [
    {
      text: "NO",
      onPress: () => console.warn("NO Pressed"),
    },
    {
      text: "YES",
      onPress: () => {
        acceptJob(job, handlerA, handlerB, handlerC, handlerD);
      },
      style: "cancel",
    },
  ]);
};

const reject = (jobID, handlerA, handlerB, handlerC, handlerD) => {
  Alert.alert("Confirm", "Are you sure you want to reject this session?", [
    {
      text: "NO",
      onPress: () => console.warn("NO Pressed"),
      style: "cancel",
    },
    {
      text: "YES",
      onPress: () => rejectJob(jobID, handlerA, handlerB, handlerC, handlerD),
    },
  ]);
};

const ConfirmJob = (props) => {
  // console.log(job)
  const [loading, setLoading] = React.useState(false);
  const { isStudent } = React.useContext(Context);
  const date = moment(props.job.start).format("LL");
  const start = moment(props.job.start).format("hh:mm");
  const finish = moment(props.job.finish).format("hh:mm");
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate("Job", props)}
    >
      <View style={styles.details}>
        <View style={styles.detail}>
          <AvenirTextBold style={{ fontSize: 16 }} text={"Subject"} />
        </View>
        <View style={styles.detail}>
          <AvenirTextBold style={{ fontSize: 16 }} text={"Date"} />
        </View>
        <View style={styles.detail}>
          <AvenirTextBold style={{ fontSize: 16 }} text={"Time"} />
        </View>
        <View style={styles.detail}>
          <AvenirTextBold
            style={{ fontSize: 16 }}
            text={isStudent ? "Tutor" : "Student"}
          />
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detail}>
          <AvenirText style={{ fontSize: 16 }} text={props.job.name} />
        </View>
        <View style={styles.detail}>
          <AvenirText style={{ fontSize: 16 }} text={date} />
        </View>
        <View style={styles.detail}>
          <AvenirText style={{ fontSize: 16 }} text={start + " - " + finish} />
        </View>
        <View style={styles.detail}>
          <AvenirText
            style={{ fontSize: 16 }}
            text={props.job.first_name + " " + props.job.last_name}
          />
        </View>
      </View>
      <View style={styles.choices}>
        {loading ? <Loading /> : false}
        {isStudent ? (
          false
        ) : (
          <TouchableOpacity
            style={styles.choice}
            onPress={() =>
              confirm(
                props.job,
                props.setJobsConfirm,
                props.setJobsUpComing,
                props.setJobsPast,
                setLoading
              )
            }
          >
            <Ionicons name={"md-checkmark"} size={40} color="#42c86f" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.choice}
          onPress={() =>
            reject(
              props.job,
              props.setJobsConfirm,
              props.setJobsUpComing,
              props.setJobsPast,
              setLoading
            )
          }
        >
          <Ionicons name={"md-close"} size={40} color="#b60c26" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const UpComingJob = (props) => {
  //console.log(job)
  const date = moment(props.job.start).format("LL");
  const start = moment(props.job.start).format("hh:mm");
  const finish = moment(props.job.finish).format("hh:mm");

  const { isStudent } = React.useContext(Context);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate("Job", props)}
    >
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
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={props.job.name}
          />
        </View>
        <View style={styles.detail}>
          <AvenirText style={{ fontSize: 16, color: "#373737" }} text={date} />
        </View>
        <View style={styles.detail}>
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={start + " - " + finish}
          />
        </View>
        <View style={styles.detail}>
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={props.job.first_name + " " + props.job.last_name}
          />
        </View>
      </View>
      <View style={styles.choices}>
        <View style={styles.days}>
          <AvenirText
            style={{ fontSize: 30, color: Colors.primary }}
            text={props.job.days}
          />
          <AvenirText
            style={{ fontSize: 18, color: "#373737" }}
            text={"Days away"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PastJob = (props) => {
  //console.log(job)
  const date = moment(props.job.start).format("LL");
  const start = moment(props.job.start).format("hh:mm");
  const finish = moment(props.job.finish).format("hh:mm");

  const { isStudent } = React.useContext(Context);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate("Job", props)}
    >
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
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={props.job.name}
          />
        </View>
        <View style={styles.detail}>
          <AvenirText style={{ fontSize: 16, color: "#373737" }} text={date} />
        </View>
        <View style={styles.detail}>
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={start + " - " + finish}
          />
        </View>
        <View style={styles.detail}>
          <AvenirText
            style={{ fontSize: 16, color: "#373737" }}
            text={props.job.first_name + " " + props.job.last_name}
          />
        </View>
      </View>
      <View style={styles.choices}>
        <View style={styles.days}>
          <AvenirText
            style={{ fontSize: 30, color: Colors.primary }}
            text={props.job.days}
          />
          <AvenirText
            style={{ fontSize: 18, color: "#373737" }}
            text={"Days ago"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Jobs(props) {
  const { jobsConfirm, setJobsConfirm } = React.useContext(Context);
  const { jobsUpComing, setJobsUpComing } = React.useContext(Context);
  const { jobsPast, setJobsPast } = React.useContext(Context);

  React.useEffect(() => {
    getJobs(setJobsConfirm, setJobsUpComing, setJobsPast);
  }, []);

  return (
    <>
      <View style={styles.sessionsHeader}>
        <Ionicons
          name={"md-checkmark-circle-outline"}
          size={30}
          color={Colors.primary}
        />
        <AvenirText
          style={{ fontSize: 25, color: "#373737", marginLeft: 15 }}
          text={"Pending sessions"}
        />
      </View>
      {jobsConfirm.length ? (
        <FlatList
          numColumns={1}
          data={jobsConfirm}
          renderItem={({ item }) => (
            <ConfirmJob
              setJobsConfirm={setJobsConfirm}
              setJobsUpComing={setJobsUpComing}
              setJobsPast={setJobsPast}
              navigation={props.navigation}
              job={item}
              hideCancel={false}
            />
          )}
        />
      ) : (
        <AvenirText
          style={{ fontSize: 18, color: "#d3d3d3", marginLeft: 15 }}
          text={"No sessions to confirm"}
        />
      )}
      <View style={styles.sessionsHeader}>
        <Ionicons name={"ios-calendar"} size={30} color={Colors.primary} />
        <AvenirText
          style={{ fontSize: 25, color: "#373737", marginLeft: 15 }}
          text={"Up coming sessions"}
        />
      </View>
      {jobsUpComing.length ? (
        <FlatList
          numColumns={1}
          data={jobsUpComing}
          renderItem={({ item }) => (
            <UpComingJob
              setJobsConfirm={setJobsConfirm}
              setJobsUpComing={setJobsUpComing}
              setJobsPast={setJobsPast}
              navigation={props.navigation}
              job={item}
              hideCancel={false}
            />
          )}
        />
      ) : (
        <AvenirText
          style={{ fontSize: 18, color: "#d3d3d3", marginLeft: 15 }}
          text={"No sessions up coming"}
        />
      )}

      <View style={styles.sessionsHeader}>
        <Ionicons name={"md-time"} size={30} color={Colors.primary} />
        <AvenirText
          style={{ fontSize: 25, color: "#373737", marginLeft: 15 }}
          text={"Past sessions"}
        />
      </View>
      {jobsPast.length ? (
        <FlatList
          numColumns={1}
          data={jobsPast}
          renderItem={({ item }) => (
            <PastJob
              navigation={props.navigation}
              job={item}
              hideCancel={true}
            />
          )}
        />
      ) : (
        <AvenirText
          style={{ fontSize: 18, color: "#d3d3d3", marginLeft: 15 }}
          text={"No past sessions"}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: "30%",
  },
  choices: {
    flex: 1,
    height: "100%",
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
  sessionsHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
});
