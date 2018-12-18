import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo';
import { View, Image } from 'react-native';
import LoadingStyles from '../styles/Loading.styles';

const logo = require('../assets/Connections.png');

const LoadingComponent = () => (
  <View style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#1D9FBF', flex: 1 }} />
    <LinearGradient
      colors={['rgba(225,225,225,225)', 'transparent']}
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

export default LoadingComponent;
