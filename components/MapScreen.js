import React, { Component } from 'react';
import { View, Button } from 'react-native';
import * as Expo from 'expo';

export default class App extends Component {
  state = {
    location: null,
    where: null,
  };

  componentDidMount() {
    this.getlocation();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: <Button title="burger navbar" onPress={() => alert('burger pop out')} />,
  });

  // headerLeft: <Button title="burger navbar" onPress={() => {navigation.navigate('sidebar')}} />,

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
      const where = (await Expo.Location.reverseGeocodeAsync(location.coords))[0];
      this.setState({
        location,
        where,
      });
    }
  };

  render() {
    const { location, where } = this.state;
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
      >
        <Expo.MapView.Marker
          coordinate={location.coords}
          title="you are here: "
          description={where.name}
          pinColor="blue"
        />
      </Expo.MapView>
    );
  }
}
