import React, { Component } from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import * as firebase from 'firebase';
import LoadingStyles from '../styles/Loading.styles';

class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'mainFlow' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={LoadingStyles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;
