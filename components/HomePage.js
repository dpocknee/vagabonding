import { Button } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

const { getUserLocation, getLoggedInUsers } = require('../Functionality/utilityFunctions');

class HomePage extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid, 'uid');
        getUserLocation(user, (err, locationAndError) => {
          this.setState(
            {
              user,
              ...locationAndError,
            },
            () => {
              getLoggedInUsers();
            },
          );
        });
        // console.log('got to getLoggedInUsers fucntion');
      }
    });
  }

  handleLogout = () => {
    const { currentUser } = firebase.auth();
    firebase
      .auth()
      .signOut()
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({ loggedIn: false });
        this.setState({
          currentUser: null,
        });
        this.props.navigation.navigate('AuthLoading');
      });
  };

  render() {
    return <Button title="Log out" onPress={this.handleLogout} />;
  }
}

export default HomePage;
