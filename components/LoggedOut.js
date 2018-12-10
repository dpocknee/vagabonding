import { Text } from "react-native";
import React, { Component } from "react";

class LoggedOut extends Component {
  render() {
    console.log(this.props);
    return <Text>You should be logged out!!</Text>;
  }
  componentDidMount() {
    console.log("mounted");
    this.props.navigation.actions.navigate("loginFlow");
  }
}

export default LoggedOut;
