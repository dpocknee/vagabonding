import React, { Component } from 'react';
import * as firebase from 'firebase';

const {
  getUserLocation,
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
      }
    });
  }
}

export default HomePage;
