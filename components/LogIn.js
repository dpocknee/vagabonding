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
        firebase
          .firestore()
          .collection('users')
          .doc(currentUser.uid)
          .update({ loggedIn: true });
      })
      .then(this.props.navigation.navigate('mainFlow'))
      .catch((err) => {
        this.setState({
          errorMessage: err.message,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
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
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign up"
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

export default Login;
