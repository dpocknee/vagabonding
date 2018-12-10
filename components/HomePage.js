import { Text, Button } from 'react-native';
import React, { Component } from 'react';
import * as firebase from 'firebase';

class HomePage extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({
      currentUser,
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
        this.props.navigation.navigate('LoggedOut');
      });
  };

  render() {
    return <Button title="Log out" onPress={this.handleLogout} />;
  }
}

export default HomePage;
