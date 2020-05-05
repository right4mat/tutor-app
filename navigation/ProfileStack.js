import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreenStudent";
import Profile from "../screens/LinksScreen";
import BasicInfo from "../screens/BasicInfo";
import CardDetails from "../screens/CardDetails";
import EnterCard from "../screens/EnterCard";
import Location from "../screens/Location";
import Password from "../screens/Password";
import PayPeriod from "../screens/PayPeriod";
import StudentsTutors from "../screens/StudentsTutors";
import TutorProfile from "../screens/TutorProfile";
import StudentProfile from "../screens/StudentProfile";
import JobList from "../screens/JobList";
import Job from "../screens/Job";
import Help from "../screens/Help";
import Timetable from "../screens/Timetable";

import Colors from "../constants/Colors";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

const stackNav = createStackNavigator();
const INITIAL_ROUTE_NAME = "Links";

export default function ClientProfileStack({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  let [fontsLoaded] = useFonts({
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <stackNav.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <stackNav.Screen
          options={{
            header: null,
            headerMode: "none",
            headerShown: false,
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
          name="Profile"
          component={Profile}
        />
        <stackNav.Screen
          name="BasicInfo"
          component={BasicInfo}
          options={{
            title: "Basic Info",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="CardDetails"
          component={CardDetails}
          options={{
            title: "Card Details",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="EnterCard"
          component={EnterCard}
          options={{
            title: "Enter Card",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />

        <stackNav.Screen
          name="Timetable"
          component={Timetable}
          options={{
            title: "Timetable",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />

        <stackNav.Screen
          name="Location"
          component={Location}
          options={{
            title: "Location",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="Password"
          component={Password}
          options={{
            title: "Reset Password",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="PayPeriod"
          component={PayPeriod}
          options={{
            title: "Pay Period",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="BillingPeriod"
          component={PayPeriod}
          options={{
            title: "Billing Period",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="Help"
          component={Help}
          options={{
            title: "Help",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="MyTutors"
          component={StudentsTutors}
          options={{
            title: "My Tutors",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="MyStudents"
          component={StudentsTutors}
          options={{
            title: "My Students",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="TutorProfile"
          component={TutorProfile}
          options={{
            title: "Profile",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="StudentProfile"
          component={StudentProfile}
          options={{
            title: "Profile",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="JobList"
          component={JobList}
          options={{
            title: "My Sessions",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
        <stackNav.Screen
          name="Job"
          component={Job}
          options={{
            title: "Session",
            headerTitleStyle: {
              color: Colors.primary,
              fontFamily: "Lato-Bold",
            },
            headerTintColor: Colors.primary,
          }}
        />
      </stackNav.Navigator>
    );
  }
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Links":
      return "Profile";
  }
}
