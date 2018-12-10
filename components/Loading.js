import React, { Component } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import * as firebase from "firebase";

class Loading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "mainFlow" : "SignUp");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loading;
