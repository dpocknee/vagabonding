import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import * as Expo from 'expo';
import PropTypes from 'prop-types';

import Users from './Users';
import Hamburger from './Hamburger';

/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('drawerStatus')();
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" />
      </Button>
    ),
  });

  state = {
    location: null,
    where: null,
    isDrawerOpen: false,
    dev: true, // This is a state variable to set whether you want development geo-location settings
    // The default dev location is Old Trafford stadium.
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerStatus });
    this.getlocation();
  }

  drawerStatus = () => {
    this.setState((state) => {
      const inverseDrawer = !state.isDrawerOpen;
      return { isDrawerOpen: inverseDrawer };
    });
  };

  getlocation = async () => {
    const { dev } = this.state;
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted' || dev === true) {
      const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
      this.setState({
        location: { coords: oldTrafford },
        where: { coords: oldTrafford },
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

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { location, where, isDrawerOpen } = this.state;
    const { navigation, screenProps } = this.props;
    if (!location) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            fontWeight: 'bold',
          }}
        >
          <Text>
            {
              "Error: Cannot find user GPS location. Try enabling GPS or allowing the app to use the phone's GPS"
            }
            .
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Hamburger
          allNav={this.allNav}
          isDrawerOpen={isDrawerOpen}
          drawerStatus={this.drawerStatus}
        >
          <>
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
              <Expo.MapView.Circle
                center={location.coords}
                radius={1500}
                fillColor="rgba(204, 210, 192, 0.5)"
                style={{ opacity: 0.5 }}
              />
            </Expo.MapView>
            <Users
              style={{ flex: 1 }}
              props={this.props}
              users={screenProps.users}
              navigation={navigation}
            />
          </>
        </Hamburger>
      </View>
    );
  }
}

MapScreen.propTypes = {
  screenProps: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
