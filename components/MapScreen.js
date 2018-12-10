import React, { Component } from 'react';
import { View } from 'react-native';
import * as Expo from 'expo';

export default class App extends Component {
  state = {
    location: null,
  };

  componentDidMount() {
    this.getlocation();
  }

  getlocation = async () => {
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
      // console.error('Location denied');
      this.setState({
        location: oldTrafford,
      });
    } else {
      const location = await Expo.Location.getCurrentPositionAsync({});
      this.setState({
        location,
      });
    }
  };

  render() {
    const { location } = this.state;
    if (!location) {
      return <View />;
    }
    return (
      <Expo.MapView
        style={{ flex: 1 }}
        provider={Expo.MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    );
  }
}
