import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import * as firebase from 'firebase';
import { CheckBox } from 'react-native-elements';
import 'firebase/firestore';
import {
  H1, H2, H3, Button,
} from 'native-base';
import signUpStyles from '../styles/SignUp.styles';
import { generalStyling, generalFont } from '../styles/generalStyling.styles';

const { firestore } = require('../config');

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
      name, username, email, password, museums, bars, restaurants,
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
      <View style={signUpStyles.container}>
        <H1 style={generalStyling.h1}>Whatever the title of this app is</H1>
        <H2 style={generalStyling.h2}>Sign Up</H2>
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <TextInput
          placeholder="name"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newName => this.setState({ name: newName })}
          value={name}
        />
        <TextInput
          placeholder="username"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newUsername => this.setState({ username: newUsername })}
          value={username}
        />
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={generalStyling.textInput}
          onChangeText={newEmail => this.setState({ email: newEmail })}
          value={email}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={generalStyling.textInput}
          onChangeText={newPassword => this.setState({ password: newPassword })}
          value={password}
        />
        <View style={signUpStyles.interests}>
          <H3 style={generalStyling.h3}>Tick the things that interest you</H3>
          <CheckBox
            title="Museums and galleries"
            checked={museums}
            fontFamily={generalFont}
            style={generalStyling.checkbox}
            onPress={() => this.setState({ museums: !museums })}
          />
          <CheckBox
            title="Bars and clubs"
            checked={bars}
            style={generalStyling.checkbox}
            onPress={() => this.setState({ bars: !bars })}
          />
          <CheckBox
            title="Local restaurants"
            checked={restaurants}
            style={generalStyling.checkbox}
            onPress={() => this.setState({ restaurants: !restaurants })}
          />
        </View>
        <View style={signUpStyles.buttons}>
          <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <Button
                rounded
                title="Sign Up"
                onPress={this.handleSignUp}
                style={generalStyling.button}
              >
                <Text style={generalStyling.buttonText}>Sign Up</Text>
              </Button>
            </View>
          </View>
          <View style={{ ustifyContent: 'center', alignItems: 'center' }}>
            <Text style={generalStyling.normal}>Already Have an account?</Text>
            <View>
              <Button
                title="Already have an account? Login"
                rounded
                style={generalStyling.button}
                onPress={() => {
                  this.props.navigation.navigate('LogIn');
                }}
              >
                <Text style={generalStyling.buttonText}>Login</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUp;
