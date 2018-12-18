import React, { Component } from 'react';
import {
  StyleSheet, Text, ActivityIndicator, View,
} from 'react-native';
import * as firebase from 'firebase';
import { Font } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Loading extends Component {
  componentDidMount() {
    Font.loadAsync({
      'Thasadith-Regular': require('../assets/fonts/Thasadith/Thasadith-Regular.ttf'),
      'Thasadith-Bold': require('../assets/fonts/Thasadith/Thasadith-Bold.ttf'),
    });
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'mainFlow' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;
