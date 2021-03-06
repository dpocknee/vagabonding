import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import 'firebase/firestore';
import { Font, AppLoading } from 'expo';
import AuthLoading from './components/AuthLoading';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import ChatScreen from './components/ChatScreen';
import MapScreen from './components/MapScreen';
import InboxScreen from './components/InboxScreen';
import ProfileScreen from './components/ProfileScreen';
import ErrorComponent from './components/ErrorComponent';
import NearbyEvents from './components/NearbyEvents';
import EventInfo from './components/EventInfo';
import CreateEvent from './components/CreateEvent';

console.disableYellowBox = true;

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
    Error: {
      screen: ErrorComponent,
    },
    CreateEvent: {
      screen: CreateEvent,
    },
    NearbyEvents: {
      screen: NearbyEvents,
    },
    EventInfo: {
      screen: EventInfo,
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
export default class App extends Component {
  state = {
    isReady: false,
  };

  cacheFonts = async () => {
    /* eslint global-require: 0 */
    await Font.loadAsync({
      'Thasadith-Regular': require('./assets/fonts/Thasadith/Thasadith-Regular.ttf'),
      'Thasadith-Bold': require('./assets/fonts/Thasadith/Thasadith-Bold.ttf'),
    });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={() => this.cacheFonts()}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <AppContainer />;
  }
}
