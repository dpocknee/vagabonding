import React from 'react';
import * as Expo from 'expo';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import 'firebase/firestore';
import AuthLoading from './components/AuthLoading';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
//  *****FOR TEST PURPOSES ONLY*****
// import HomePage from './components/HomePage';
// import Chat from './components/Chat';
// import Inbox from './components/Inbox';
//  *****FOR TEST PURPOSES ONLY*****
import MapScreen from './components/MapScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatScreen from './components/ChatScreen';
import InboxScreen from './components/InboxScreen';

import mockUsers from './mockUsers';

/* eslint react/no-unused-state: 0 */

const loginFlow = createSwitchNavigator(
  {
    Loading: {
      screen: Loading,
    },
    LogIn: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

const mainFlow = createStackNavigator(
  // Add main app components here - remember to include screen property
  {
    Map: {
      screen: MapScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Inbox: {
      screen: InboxScreen,
    },
  },
  {
    initialRouteName: 'MapScreen',
  },
);
// *****FOR TEST PURPOSES ONLY*****
// {
//   // Chat: {
//   //   screen: Chat,
//   // },
//   //   HomePage: {
//   //     screen: HomePage,
//   //   },
// },
// { initialRouteName: 'Chat' },
// *****FOR TEST PURPOSES ONLY*****

const appNavigation = createSwitchNavigator(
  {
    AuthLoading,
    loginFlow,
    mainFlow,
  },
  { initialRouteName: 'AuthLoading' },
  //   { initialRouteName: 'mainFlow' },
);

const AppContainer = createAppContainer(appNavigation);

// Note: Entire navigation is in this component
// if navigation breaks may be to do with this component

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
