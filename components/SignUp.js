import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import * as firebase from "firebase";
import { CheckBox } from "react-native-elements";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    museumsChecked: false,
    barsChecked: false,
    restaurantsChecked: false
  };

  handleSignUp = () => {
    const { email, password } = this.state;
    const { currentUser } = firebase.auth();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(currentUser.uid)
          .set({ location: { latitude: 0, longitude: 0 }, loggedIn: true });
        this.props.navigation.navigate("mainFlow");
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message
        });
      });
  };

  render() {
    const {
      errorMessage,
      email,
      password,
      museumsChecked,
      barsChecked,
      restaurantsChecked
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={email}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Text>Tick the things that interest you</Text>
        <CheckBox
          title="Museums and galleries"
          checked={museumsChecked}
          onPress={() => this.setState({ museumsChecked: !museumsChecked })}
        />
        <CheckBox
          title="Bars and clubs"
          checked={barsChecked}
          onPress={() => this.setState({ barsChecked: !barsChecked })}
        />
        <CheckBox
          title="Local restaurants"
          checked={restaurantsChecked}
          onPress={() =>
            this.setState({ restaurantsChecked: !restaurantsChecked })
          }
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => {
            this.props.navigation.navigate("LogIn");
          }}
        />
      </View>
    );
  }
}

export default SignUp;
