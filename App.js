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
//  *****FOR TEST PURPOSES ONLY*****
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import LogoutScreen from './components/LogoutScreen';
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
// *****FOR TEST PURPOSES ONLY*****
// {
//   Chat: {
//     screen: Chat,
//   },
//   HomePage: {
//     screen: HomePage,
//   },
// },
// { initialRouteName: 'HomePage' },
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

// Note: Entire navigation is in this component, if navigation breaks may be to do with this component
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
