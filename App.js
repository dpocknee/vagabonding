import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import 'firebase/firestore';
import AuthLoading from './components/AuthLoading';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import HomePage from './components/HomePage';

const { firestore } = require('./config');
const { query } = require('./Functionality/chatFunctions');

query.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

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

const mainFlow = createStackNavigator({
  HomePage: {
    screen: HomePage,
  },
});

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
