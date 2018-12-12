import React, { Component } from 'react';
import { View, Button } from 'react-native';
import * as Expo from 'expo';
import PropTypes from 'prop-types';

import Users from './Users';

/* eslint react/require-default-props: 0 */

export default class MapScreen extends Component {
  // also takes navigayion as an argument
  static navigationOptions = () => ({
    headerTransparent: true,
    headerLeft: <Button title="burger navbar" onPress={() => alert('burger pop out')} />,
  });

  state = {
    location: null,
    where: null,
  };

  componentDidMount() {
    this.getlocation();
  }
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
    const { screenProps } = this.props;
    if (!location) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Expo.MapView
          style={{ height: 500 }}
          provider={Expo.MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Expo.MapView.Marker
            coordinate={location.coords}
            title="you are here: "
            description={where.name}
            pinColor="blue"
          />
          <Expo.MapView.Circle center={location.coords} radius={1500} fillColor="#dde1d5" />
        </Expo.MapView>

        {/* users component */}
        <Users style={{ flex: 1 }} props={this.props} users={screenProps.users} />
      </View>
    );
  }
}

MapScreen.propTypes = {
  screenProps: { users: PropTypes.object.isRequired },
};
