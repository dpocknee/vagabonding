import { Button } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

const {
  getUserLocation,
  getLoggedInUsers,
  filterUsersByDistance,
} = require('../Functionality/utilityFunctions');

class HomePage extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        getUserLocation(currentUser, (err, locationAndError) => {
          this.setState(
            {
              currentUser,
              ...locationAndError,
            },
            () => {
              filterUsersByDistance(currentUser, (err, nearbyUsers) => {
                console.log(nearbyUsers, 'nearbyUsers');
              });
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
