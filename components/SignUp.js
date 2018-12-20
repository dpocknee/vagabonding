import React, { Component } from 'react';
import {
  TextInput, View, Text, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import * as firebase from 'firebase';
import { CheckBox } from 'react-native-elements';
import 'firebase/firestore';
import {
  H1, H2, H3, Button, Picker,
} from 'native-base';
import Textarea from 'react-native-textarea';
import signUpStyles from '../styles/SignUp.styles';
import { generalStyling, generalFont } from '../styles/generalStyling.styles';

const { firestore } = require('../config');

class SignUp extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    // age: '',
    gender: '',
    // hometown: '',
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
      bio,
      // age,
      // hometown,
      gender,
    } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(currentUser => firestore
        .collection('users')
        .doc(currentUser.user.uid)
        .set({
          location: { latitude: null, longitude: null },
          loggedIn: true,
          interests: { museums, bars, restaurants },
          name,
          username,
          bio,
          // age,
          gender,
          // hometown,
          radius: 1000,
        }))
      .then(() => {
        this.props.navigation.navigate('mainFlow');
      })
      .catch(() => {
        this.props.navigation.navigate('Error');
      });
  };

  render() {
    const {
      errorMessage,
      name,
      username,
      email,
      password,
      bio,
      // age,
      gender,
      // hometown,
      museums,
      bars,
      restaurants,
    } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.select({ android: 'padding', ios: undefined })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={signUpStyles.container}>
          <View style={signUpStyles.mainView}>
          <H1 style={signUpStyles.title}>Vagabonding</H1>
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
            onChangeText={(newPassword) => {
              this.setState({ password: newPassword });
            }}
            value={password}
          />
          {/* <TextInput
            placeholder="age"
            keyboardType="numeric"
            style={generalStyling.textInput}
            maxLength={3}
            onChange={(newAge) => {
              console.log('age');
              this.setState({ age: newAge });
            }}
            value={age}
          /> */}
          {/* <TextInput
            placeholder="hometown"
            style={generalStyling.textInput}
            onChange={(newHometown) => {
              console.log('hometown');
              this.setState({ hometown: newHometown });
            }}
            value={hometown}
          /> */}
          <View style={generalStyling.dropDownChoice}>
            <Picker
              mode="dropdown"
              placeholder="Choose Gender..."
              selectedValue={gender}
              onValueChange={newGender => this.setState({ gender: newGender })}
            >
              <Picker.Item label="Choose Gender..." disabled />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
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
          <Textarea
            placeholder="Write a little bit about yourself..."
            maxLength={200}
            containerStyle={generalStyling.textareaContainer}
            style={generalStyling.textarea}
            onChangeText={newBio => this.setState({ bio: newBio })}
            value={bio}
          />
          <View style={signUpStyles.buttons}>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Button
                  rounded
                  title="Sign Up"
                  onPress={this.handleSignUp}
                  style={generalStyling.longButton}
                >
                  <Text style={generalStyling.buttonText}>Sign Up</Text>
                </Button>
              </View>
            </View>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={generalStyling.normal}>Already have an account?</Text>
              <View>
                <Button
                  title="Already have an account? Login"
                  rounded
                  style={generalStyling.longButton}
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
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;
