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
    isDrawerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerStatus });
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

  drawerStatus = () => {
    this.setState((state) => {
      const inverseDrawer = !state.isDrawerOpen;
      return { isDrawerOpen: inverseDrawer };
    });
  };

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const {
      locationAndError, nearbyUsers, currentUser, isDrawerOpen,
    } = this.state;
    const { navigation } = this.props;
    if (!locationAndError || !nearbyUsers) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" />
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
                latitude: locationAndError.location.latitude,
                longitude: locationAndError.location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Expo.MapView.Marker
                coordinate={locationAndError.location}
                title="you are here: "
                pinColor="blue"
              />
              <Expo.MapView.Circle
                center={locationAndError.location}
                radius={1500}
                fillColor="rgba(204, 210, 192, 0.5)"
                style={{ opacity: 0.5 }}
              />
            </Expo.MapView>

            <Users
              style={{ flex: 1 }}
              currentUser={currentUser}
              users={nearbyUsers}
              onSelectUser={(user) => {
                navigation.navigate('ProfileScreen');
              }}
            />
          </>
        </Hamburger>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
