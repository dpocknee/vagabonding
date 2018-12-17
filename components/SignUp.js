import React, { Component } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,
} from 'react-native';
import * as firebase from 'firebase';
import { CheckBox } from 'react-native-elements';
import 'firebase/firestore';

const { firestore } = require('../config');

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
    name: '',
    username: '',
    email: '',
    password: '',
    errorMessage: null,
    museums: false,
    bars: false,
    restaurants: false,
  };

  handleSignUp = () => {
    const {
      name,
      username,
      email,
      password,
      museums,
      bars,
      restaurants,
    } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        firestore
          .collection('users')
          .doc(currentUser.uid)
          .set({
            location: { latitude: null, longitude: null },
            loggedIn: true,
            interests: { museums, bars, restaurants },
            name,
            username,
            radius: 1000,
          });
        this.props.navigation.navigate('mainFlow');
      })
      .catch((err) => {
        console.log(err, '<<<<Create User');
        this.setState({
          errorMessage: err.message,
        });
      });
  };

  render() {
    const {
      errorMessage,
      name,
      username,
      email,
      password,
      museums,
      bars,
      restaurants,
    } = this.state;

    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="name"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={newName => this.setState({ name: newName })}
          value={name}
        />
        <TextInput
          placeholder="username"
          autoCapitalize="words"
          style={styles.textInput}
          onChangeText={newUsername => this.setState({ username: newUsername })}
          value={username}
        />
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={newEmail => this.setState({ email: newEmail })}
          value={email}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
          onChangeText={newPassword => this.setState({ password: newPassword })}
          value={password}
        />
        <Text>Tick the things that interest you</Text>
        <CheckBox
          title="Museums and galleries"
          checked={museums}
          onPress={() => this.setState({ museums: !museums })}
        />
        <CheckBox
          title="Bars and clubs"
          checked={bars}
          onPress={() => this.setState({ bars: !bars })}
        />
        <CheckBox
          title="Local restaurants"
          checked={restaurants}
          onPress={() => this.setState({ restaurants: !restaurants })}
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
