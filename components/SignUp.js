import React, { Component } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
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
          .collection('users')
          .doc(currentUser.uid)
          .set({ location: { latitude: 0, longitude: 0 }, loggedIn: true });
        this.props.navigation.navigate('mainFlow');
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.message,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => {
            this.props.navigation.navigate('LogIn');
          }}
        />
      </View>
    );
  }
}

export default SignUp;
