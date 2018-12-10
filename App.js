import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig, settings } from './config';
import AuthLoading from './components/AuthLoading';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings(settings);

const loginFlow = createSwitchNavigator();

// add login components here - remember to include screen property

const mainFlow = createStackNavigator();
// add login components here - remember to include screen property

const appNavigation = createSwitchNavigator(
  {
    AuthLoading,
    loginFlow,
    mainFlow,
  },
  { initialRouteName: 'AuthLoading' },
);

const App = createAppContainer(appNavigation);

export default App;
