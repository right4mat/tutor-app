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
  DatePickerIOS,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import AvenirText from "../components/avenirText";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Context from "../context/Context";

import Colors from "../constants/Colors";

export default function Filters({ route, navigation }) {
  const [distance, setDistance] = React.useState(20);

  const [subject, setSubject] = React.useState(false);

  const [year, setYear] = React.useState(false);

  const [type, setType] = React.useState(false);

  const [group, setGroup] = React.useState(false);

  const [local, setLocal] = React.useState(true);

  const [date, setDate] = React.useState(moment(route.params.date));
  const [showDate, setShowDate] = React.useState(false);
  const [start, setStart] = React.useState(moment().startOf("hour"));
  const [showStart, setShowStart] = React.useState(false);
  const [finish, setFinish] = React.useState(moment(start).add(1, "hour"));
  const [showFinish, setShowFinish] = React.useState(false);

  const { address } = React.useContext(Context);
  const { location } = React.useContext(Context);

  const payload = async () => {
    return {
      sessionID: await AsyncStorage.getItem('loggedIn'),
      location: location,
      distance: distance,
      year: year,
      subject: subject,
      type: type,
      group: group,
      local: local,
      start: moment(start).format("YYYY-MM-DD HH:mm"),
      finish: moment(finish).format("YYYY-MM-DD HH:mm"),
      date: moment(date).format("YYYY-MM-DD HH:mm"),
    };
  };

  const validateSend =  async () => {
    if (!checkTimeStart(start)) {
      return false;
    } else if (!checkTimeFinish(finish)) {
      return false;
    } else if (!year) {
      alert("You must select year group");
      return false;
    } else if (!subject) {
      alert("You must select a subject");
      return false;
    }

    navigation.navigate("SearchResults", await payload());
  };

  const checkTimeStart = (time) => {
    console.log(time);
    const min = moment(time).minutes();
    const hour = moment(time).hour();
    const unix = moment(time).unix();
    const diff = moment(finish).diff(moment(time), "minutes", true);
    console.log(diff);
    if (min % 5 != 0) {
      alert("Session must fall on a 5 min interval");
      return false;
    } else if (hour < 6) {
      alert("Session must start after 6am");
      return false;
    } else if (hour > 21) {
      alert("Session must finish before 9pm");
      return false;
    } else if (unix > moment(finish).unix()) {
      alert("finish cannot be earlier then start");
      return false;
    } else if (diff < 45) {
      alert("Session must be at least 45mins");
      return false;
    }
    return true;
  };

  const checkTimeFinish = (time) => {
    console.log(time);
    const min = moment(time).minutes();
    const hour = moment(time).hour();
    const unix = moment(time).unix();
    const diff = moment(time).diff(moment(start), "minutes", true);
    console.log(diff);
    if (min % 5 != 0) {
      alert("Session must fall on a 5 min interval");
      return false;
    } else if (hour < 6) {
      alert("Session must start after 6am");
      return false;
    } else if (hour > 21) {
      alert("Session must finish before 9pm");
      return false;
    } else if (unix < moment(start).unix()) {
      alert("Start cannot be later then finish");
      return false;
    } else if (diff < 45) {
      alert("Session must be at least 45mins");
      return false;
    }
    return true;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(moment(currentDate));
  };

  const onChangeStart = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowStart(false);
    setStart(moment(currentTime));
  };

  const onChangeFinish = (event, selectedTime) => {
    console.log(selectedTime);
    const currentTime = selectedTime;
    setShowFinish(false);
    setFinish(moment(currentTime));
  };

  const getDateString = (date) => {
    const sd = date.toString().split(" ");
    return [sd[0], sd[1], sd[2], sd[3]].join(" ");
  };

  const getTimeString = (time) => {
    let st = time.toString().split(" ");
    st = st[4].split(":");
    return [st[0], st[1]].join(":");
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.textBox}>
          <AvenirText text={"Find your prefect tutor!"} />
        </View>

        <TouchableOpacity
          style={styles.textInput}
          onPress={() => setShowDate(true)}
        >
          <View style={styles.cardIcon}>
            <Ionicons
              name={"md-calendar"}
              size={22}
              color={Colors.secondaryLight}
            />
          </View>
          <AvenirText
            style={styles.buttonTextCard}
            text={getDateString(date)}
          />
        </TouchableOpacity>

        <View style={styles.double}>
          <TouchableOpacity
            style={[styles.textInput, { width: "48%" }]}
            onPress={() => {
              setShowStart(true);
              setShowFinish(false);
            }}
          >
            <View style={styles.cardIcon}>
              <Ionicons
                name={"md-clock"}
                size={22}
                color={Colors.secondaryLight}
              />
            </View>
            <AvenirText
              style={styles.buttonTextCard}
              text={getTimeString(start)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.textInput, { width: "48%" }]}
            onPress={() => {
              setShowFinish(true);
              setShowStart(false);
            }}
          >
            <View style={styles.cardIcon}>
              <Ionicons
                name={"md-clock"}
                size={22}
                color={Colors.secondaryLight}
              />
            </View>
            <AvenirText
              style={styles.buttonTextCard}
              text={getTimeString(finish)}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.textInput}
          onPress={() => navigation.navigate("Location")}
        >
          <View style={styles.cardIcon}>
            <Ionicons name={"md-pin"} size={22} color={Colors.secondaryLight} />
          </View>
          <AvenirText style={styles.buttonTextCard} text={address} />
        </TouchableOpacity>

        <View style={styles.textBox}>
          <AvenirText text={"I want a someone thats..."} />
        </View>

        <View style={styles.primary}>
          <YearCheckBox
            state={local}
            setState={setLocal}
            id={true}
            title={"in person"}
          />
          <YearCheckBox
            state={local}
            setState={setLocal}
            id={false}
            title={"remote"}
          />
        </View>
        {local ? (
          <>
            <View style={styles.textBox}>
              <AvenirText text={"Tutor within " + distance + "km"} />
            </View>

            <Slider
              style={{ width: "100%", paddingVertical: 15 }}
              maximumValue={100}
              minimumValue={0}
              step={1}
              value={20}
              thumbTintColor={"#f2f2f2"}
              maximumTrackTintColor={"rgba(212,175,54,.5)"}
              minimumTrackTintColor={"rgba(54,212,173,.5)"}
              onValueChange={(x) => setDistance(x)}
              onSlidingComplete={(x) => setDistance(x)}
            />
          </>
        ) : (
          false
        )}

        <View style={styles.textBox}>
          <AvenirText text={"I want a..."} />
        </View>

        <View style={styles.primary}>
          <YearCheckBox
            state={type}
            setState={setType}
            id={true}
            title={"teacher"}
          />
          <YearCheckBox
            state={type}
            setState={setType}
            id={false}
            title={"tutor"}
          />
        </View>

        <View style={styles.textBox}>
          <AvenirText text={"I want to be tutored..."} />
        </View>

        <View style={styles.primary}>
          <YearCheckBox
            state={group}
            setState={setGroup}
            id={false}
            title={"solo"}
          />
          <YearCheckBox
            state={group}
            setState={setGroup}
            id={true}
            title={"group"}
          />
        </View>

        <View style={styles.textBox}>
          <AvenirText
            text={"I need a tutor that can teach primary school..."}
          />
        </View>

        <View style={styles.primary}>
          <YearCheckBox
            state={year}
            setState={setYear}
            id={"k-2"}
            title={"years k-2"}
          />
          <YearCheckBox
            state={year}
            setState={setYear}
            id={"3-6"}
            title={"years 3-6"}
          />
        </View>

        <View style={styles.textBox}>
          <AvenirText text={"I need a tutor that can teach high school..."} />
        </View>

        <View style={styles.primary}>
          <YearCheckBox
            state={year}
            setState={setYear}
            id={"7-10"}
            title={"years 7-10"}
          />
          <YearCheckBox
            state={year}
            setState={setYear}
            id={"11-12"}
            title={"years 11-12"}
          />
        </View>

        <View style={styles.textBox}>
          <AvenirText text={"I need a tutor that can teach..."} />
        </View>

        <Subject
          state={subject}
          setState={setSubject}
          title={"Maths"}
          icon={"ios-calculator"}
          id={2}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"English"}
          icon={"ios-paper"}
          id={6}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Science"}
          icon={"md-beaker"}
          id={3}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"PDHPE"}
          icon={"md-football"}
          id={5}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Economics"}
          icon={"md-trending-up"}
          id={1}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Coding"}
          icon={"md-code-working"}
          id={9}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Yoga"}
          icon={"ios-body"}
          id={8}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Dance"}
          icon={"md-musical-notes"}
          id={7}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Geography"}
          icon={"md-globe"}
          id={10}
        />

        <View style={styles.textBox}>
          <AvenirText text={"I need a language tutor that can teach ..."} />
        </View>

        <Subject
          state={subject}
          setState={setSubject}
          title={"French"}
          icon={"ios-quote"}
          id={11}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Spanish"}
          icon={"ios-quote"}
          id={12}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Japanese"}
          icon={"ios-quote"}
          id={13}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Arabic"}
          icon={"ios-quote"}
          id={14}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"German"}
          icon={"ios-quote"}
          id={15}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Chinese (Mandarin)"}
          icon={"ios-quote"}
          id={16}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Indonesian"}
          icon={"ios-quote"}
          id={17}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Hindi"}
          icon={"ios-quote"}
          id={18}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Modern Greek"}
          icon={"ios-quote"}
          id={19}
        />

        <View style={styles.textBox}>
          <AvenirText text={"I need a music tutor that can teach..."} />
        </View>

        <Subject
          state={subject}
          setState={setSubject}
          title={"Guitar"}
          icon={"ios-musical-note"}
          id={20}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Piano"}
          icon={"ios-musical-note"}
          id={21}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Trumpet"}
          icon={"ios-musical-note"}
          id={22}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Trombone"}
          icon={"ios-musical-note"}
          id={23}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Baritone"}
          icon={"ios-musical-note"}
          id={24}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Cello"}
          icon={"ios-musical-note"}
          id={25}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Clarinet"}
          icon={"ios-musical-note"}
          id={26}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Double bass"}
          icon={"ios-musical-note"}
          id={27}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Flute"}
          icon={"ios-musical-note"}
          id={28}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Violin"}
          icon={"ios-musical-note"}
          id={29}
        />

        <Subject
          state={subject}
          setState={setSubject}
          title={"Viola"}
          icon={"ios-musical-note"}
          id={30}
        />
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => validateSend()}>
        <Text style={styles.buttonText}>Find</Text>
      </TouchableOpacity>
      {showDate ? (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date.toDate()}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      ) : (
        false
      )}
      {showStart ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={start.toDate()}
          mode={"time"}
          is24Hour={false}
          display="default"
          minuteInterval={5}
          onChange={onChangeStart}
        />
      ) : (
        false
      )}
      {showFinish ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={finish.toDate()}
          mode={"time"}
          is24Hour={false}
          display="default"
          minuteInterval={5}
          onChange={onChangeFinish}
        />
      ) : (
        false
      )}
    </View>
    </SafeAreaView>
  );
}

const YearCheckBox = (props) => {
  return (
    <View style={styles.checkBoxContainer}>
      <CheckBox
        checkedColor={Colors.secondaryLight}
        checked={props.state === props.id}
        title={props.title}
        containerStyle={styles.checkBox}
        onPress={() => props.setState(props.id)}
      />
    </View>
  );
};

const Subject = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.subject,
        props.state === props.id
          ? { backgroundColor: Colors.secondaryLight }
          : false,
      ]}
      onPress={() => props.setState(props.id)}
    >
      <View style={styles.subjectInner}>
        <Ionicons
          name={props.icon}
          size={22}
          color={props.state === props.id ? "#fff" : Colors.primaryLight}
        />
        <AvenirText style={styles.buttonTextCard} text={props.title} />
      </View>
      <View>
        <Ionicons
          name={
            props.state === props.id
              ? "ios-checkmark-circle"
              : "ios-radio-button-off"
          }
          size={22}
          color={props.state === props.id ? "#fff" : Colors.primaryLight}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    padding: 15,
    paddingTop: 15,
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
    overflow: "hidden",
  },
  buttonTextCard: {
    //alignSelf: 'center',
    marginHorizontal: 15,
    fontSize: 18,
    color: "#000",
  },
  cardIcon: {},
  double: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  primary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkBox: {
    flex: 1,
  },
  checkBoxContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "40%",
  },
  textBox: {
    paddingVertical: 15,
  },
  subjectInner: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  subject: {
    padding: 10,
    height: 50,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    position:"absolute",
    right:15,
    bottom:30,
    padding: 15,
    minWidth: 100,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "rgba(54,212,173,1)",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#fff",
  },
});
