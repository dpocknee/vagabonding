import React from 'react';
import * as Expo from 'expo';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import { firebaseConfig, settings } from './config';
// import AuthLoading from './components/AuthLoading';
import MapScreen from './components/MapScreen';

import ChatScreen from './components/ChatScreen';
import LogoutScreen from './components/LogoutScreen';
import InboxScreen from './components/InboxScreen';

// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// firestore.settings(settings);

// const loginFlow = createSwitchNavigator({
//   // add login components here - remember to include screen property
// });

import mockUsers from './mockUsers';

/* eslint react/no-unused-state: 0 */

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

// const App = () => <AppContainer />;

export default class App extends React.Component {
  state = {
    location: null,
    where: null,
  };

  componentDidMount() {
    this.getlocation();
  }

  getlocation = async () => {
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
      // console.error('Location denied');
      this.setState({
        location: oldTrafford,
      });
    } else {
      const location = await Expo.Location.getCurrentPositionAsync({});
      const where = (await Expo.Location.reverseGeocodeAsync(location.coords))[0];
      this.setState({
        location,
        where,
      });
    }
  };

  render() {
    return <AppContainer screenProps={{ location: this.state, users: mockUsers }} />;
  }
}
