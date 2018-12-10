import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig, settings } from "./config";
import AuthLoading from "./components/AuthLoading";
import Loading from "./components/Loading";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import HomePage from "./components/HomePage";
import LoggedOut from "./components/LoggedOut";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings(settings);

const loginFlow = createSwitchNavigator(
  {
    Loading: {
      screen: Loading
    },
    LogIn: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    }
  },
  {
    initialRouteName: "Loading"
  }
);

const mainFlow = createStackNavigator({
  // Add main app components here - remember to include screen property
  HomePage: {
    screen: HomePage
  }
});

const appNavigation = createSwitchNavigator(
  {
    // AuthLoading,
    LoggedOut: {
      screen: LoggedOut
    },
    loginFlow,
    mainFlow
  },
  { initialRouteName: "loginFlow" }
);

const App = createAppContainer(appNavigation);

export default App;
