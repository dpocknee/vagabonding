import React, { Component } from "react";
import { Text } from "react-native";

class ErrorComponent extends Component {
  // state = {
  //   errorMessage: null
  // };

  // componentDidMount() {
  //   const error = this.props.navigation.getParams(errorMessage);
  //   if (error) {
  //     this.setState(
  //       {
  //         errorMessage: error
  //       },
  //       () => {
  //         if (error === "Login failed!") {
  //           this.navigateToLogin();
  //         }
  //       }
  //     );
  //   }
  // }

  // navigateToLogin = () => {
  //   setTimeout(this.props.navigation.push("loginFlow"), 10000);
  // };

  render() {
    // const { errorMessage } = this.props;
    return <Text>Error!!!</Text>;
  }
}

export default ErrorComponent;
