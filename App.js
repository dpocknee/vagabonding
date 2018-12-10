import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

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
