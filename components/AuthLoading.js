import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../assets/Connections.png');

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#9CB660',
  },
  logo: {
    resizeMode: 'contain',
  },
});

class AuthLoading extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate('loginFlow');
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.logo} source={logo} />
      </View>
    );
  }
}
export default AuthLoading;
