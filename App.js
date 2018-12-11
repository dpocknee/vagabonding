import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import { firebaseConfig, settings } from './config';
// import AuthLoading from './components/AuthLoading';
import MapScreen from './components/MapScreen';
import LogoutScreen from './components/LogoutScreen';
import InboxScreen from './components/InboxScreen';

// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// firestore.settings(settings);

// const loginFlow = createSwitchNavigator({
//   // add login components here - remember to include screen property
// });

const mainFlow = createStackNavigator(
  // Add main app components here - remember to include screen property
  {
    Map: {
      screen: MapScreen,
    },
    Inbox: {
      screen: InboxScreen,
    },
    Logout: {
      screen: LogoutScreen,
    },
  },
  {
    initialRouteName: 'Map',
  },
);

const appNavigation = createSwitchNavigator(
  {
    // AuthLoading,
    // loginFlow,
    mainFlow,
  },
  // { initialRouteName: 'AuthLoading' },
  { initialRouteName: 'mainFlow' },
);

const AppContainer = createAppContainer(appNavigation);

const App = () => <AppContainer />;

export default App;
