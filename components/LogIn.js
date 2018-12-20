import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { H1, Button } from 'native-base';
import * as firebase from 'firebase';
import ErrorComponent from './ErrorComponent';
import loginStyles from '../styles/Login.styles';
import { generalStyling } from '../styles/generalStyling.styles';
import signUpStyles from '../styles/SignUp.styles';

const { firestore } = require('../config');

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        firestore
          .collection('users')
          .doc(currentUser.uid)
          .update({ loggedIn: true });
      })
      .then(() => {
        this.props.navigation.navigate('mainFlow');
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.message,
        });
      });
  };

  render() {
    const { errorMessage } = this.state;
    const comma = "'";
    errorMessage && <ErrorComponent errorMessage={errorMessage} />;
    return (
      <View style={loginStyles.container}>
        <H1 style={signUpStyles.title}>Vagabonding</H1>
        <H1 styles={generalStyling.h1}>Login</H1>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={generalStyling.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={generalStyling.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={loginStyles.buttons}>
          <View>
            <Button
              rounded
              title="Login"
              onPress={this.handleLogin}
              style={generalStyling.longButton}
            >
              <Text style={generalStyling.buttonText}>Login</Text>
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={generalStyling.normal}>{`Don${comma}t have an account?`}</Text>
            <View>
              <Button
                rounded
                title="Don't have an account? Sign up"
                style={generalStyling.longButton}
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}
              >
                <Text style={generalStyling.buttonText}>Sign up</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
