import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig, settings } from './config';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings(settings);

const loginFlow = createSwitchNavigator({});

const mainFlow = createStackNavigator({});

const appNavigation = createStackNavigator(
  {
    loginFlow,
    mainFlow,
  },
  { initialRouteName: 'loginFlow' },
);

const App = createAppContainer(appNavigation);

export default App;
