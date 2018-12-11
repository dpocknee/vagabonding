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

const mainFlow = createStackNavigator();
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
);

const App = createAppContainer(appNavigation);

export default App;
