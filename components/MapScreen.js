import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet,
} from 'react-native';
import { Button, Icon } from 'native-base';
import * as Expo from 'expo';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

import Users from './Users';
import Hamburger from './Hamburger';
import AuthLoading from './AuthLoading';

const { getUserLocation, filterUsersByDistance } = require('../Functionality/utilityFunctions');

/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
    locationAndError: null,
    // location: null,
    // where: null,
    // isDrawerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerSatus });
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        getUserLocation(currentUser, (err, locationAndError) => {
          this.setState(
            {
              currentUser,
              locationAndError,
            },
            () => {
              filterUsersByDistance(this.state.currentUser, (err, nearbyUsers) => {
                const nearbyUsersArray = Object.entries(nearbyUsers);
                this.setState({ nearbyUsers: nearbyUsersArray });
              });
            },
          );
        });
      }
    });
  }

  drawerSatus = () => {
    // console.log('WOOHAH!');
    this.setState((state) => {
      const inverseDrawer = !state.isDrawerOpen;
      return { isDrawerOpen: inverseDrawer };
    });
  };

  // getlocation = async () => {
  //   const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
  //   // if (status !== 'granted') {
  //   console.log('STATUS', status);
  //   const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
  //   this.setState({
  //     location: { coords: oldTrafford },
  //     where: { coords: oldTrafford },
  //   });
  //   console.log('OLD TRAFFORD', oldTrafford);
  // } else {
  //   console.log('granted', status);
  //   const location = await Expo.Location.getCurrentPositionAsync({});
  //   const where = (await Expo.Location.reverseGeocodeAsync(location.coords))[0];
  //   this.setState({
  //     location,
  //     where,
  //   });
  // }
  // };

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { locationAndError, nearbyUsers, currentUser } = this.state;
    const { screenProps } = this.props;
    if (!locationAndError || !nearbyUsers) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const { isDrawerOpen } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Hamburger allNav={this.allNav} isDrawerOpen={isDrawerOpen}>
          <Expo.MapView
            style={{ height: 500 }}
            provider={Expo.MapView.PROVIDER_GOOGLE}
            initialRegion={{
              latitude: locationAndError.location.latitude,
              longitude: locationAndError.location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Expo.MapView.Marker
              coordinate={locationAndError.location}
              title="you are here: "
              // description={where.name}
              pinColor="blue"
            />
            <Expo.MapView.Circle
              center={locationAndError.location}
              radius={1500}
              fillColor="rgba(204, 210, 192, 0.5)"
              style={{ opacity: 0.5 }}
            />
          </Expo.MapView>

          {/* users component */}
          <Users
            style={{ flex: 1 }}
            currentUser={currentUser}
            users={nearbyUsers}
            onSelectUser={(user) => {
              this.props.navigation.navigate('ProfileScreen');
            }}
          />
        </Hamburger>
      </View>
    );
  }
}

MapScreen.propTypes = {
  screenProps: { users: PropTypes.object.isRequired },
  navigation: PropTypes.object.isRequired,
};
