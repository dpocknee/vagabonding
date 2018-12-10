import { Button } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

const { getUserLocation } = require('../Functionality/utilityFunctions');

class HomePage extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    getUserLocation(currentUser, (err, locationAndError) => {
      console.log(locationAndError);
      this.setState({
        currentUser,
        ...locationAndError,
      });
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
