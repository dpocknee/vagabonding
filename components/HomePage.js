import { Button } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

const { firestore } = require('../config');

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
              filterUsersByDistance(this.state.currentUser, (err, nearbyUsers) => {
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
        firestore
          .collection('users')
          .doc(currentUser.uid)
          .update({ loggedIn: false });
        this.setState({
          currentUser: null,
        });
        this.props.navigation.navigate('AuthLoading');
      })
      .catch((err) => {
        console.log(err, '<<<<Logout Func');
      });
  };

  render() {
    return <Button title="Log out" onPress={this.handleLogout} />;
  }
}

export default HomePage;
