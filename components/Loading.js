import React, { Component } from 'react';
import { View, Image } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo';
import LoadingStyles from '../styles/Loading.styles';
import { colorSettings } from '../styles/Colors.styles';

const logo = require('../assets/Connections.png');

class Loading extends Component {
  componentDidMount() {
    return firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'mainFlow' : 'LogIn');
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: colorSettings.gradientColor1, flex: 1 }} />
        <LinearGradient
          colors={colorSettings.gradientColor2}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        >
          <View style={LoadingStyles.container}>
            <Image style={LoadingStyles.logo} source={logo} />
            <Spinner visible textContent="Loading..." textStyle={LoadingStyles.spinner} />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default Loading;
