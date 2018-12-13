import React from 'react';
import * as Expo from 'expo';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import 'firebase/firestore';
import { Button, Icon } from 'native-base';
import AuthLoading from './components/AuthLoading';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import ChatScreen from './components/ChatScreen';
//  *****FOR TEST PURPOSES ONLY*****
// import HomePage from './components/HomePage';
// import Chat from './components/Chat';
//  *****FOR TEST PURPOSES ONLY*****
import MapScreen from './components/MapScreen';
import InboxScreen from './components/InboxScreen';
import ProfileScreen from './components/ProfileScreen';
// import MainWrapper from './components/MainWrapper';

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
    Chat: {
      screen: ChatScreen,
    },
    Inbox: {
      screen: InboxScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Map',
  },
);

const appNavigation = createSwitchNavigator(
  {
    AuthLoading,
    loginFlow,
    mainFlow,
  },
  { initialRouteName: 'AuthLoading' },
);

const AppContainer = createAppContainer(appNavigation);

// Note: Entire navigation is in this component
// if navigation breaks may be to do with this component

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
// https://medium.com/@jan.hesters/building-a-react-native-app-with-complex-navigation-using-react-navigation-85a479308f52
