import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import * as Expo from 'expo';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Loading from './Loading';
import Users from './Users';
import MenuWrapper from './MenuWrapper';

const {
  getUserLocation,
  filterUsersByDistance,
  getCurrentUserInfo,
} = require('../Functionality/utilityFunctions');

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
    headerRight: (
      <Button
        iconRight
        transparent
        onPress={() => {
          navigation.push('Map');
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="refresh" />
      </Button>
    ),
  });

  state = {
    locationAndError: null,
    dev: false, // special dev variable for computer emulators
    // which can't use GPS.
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // This is just a dev thing if any computers are using emulators without GPS.
        // It sets a default GPS position somewhere near the middle of Manchester.
        // REMOVE FOR PRODUCTION:
        getCurrentUserInfo(currentUser.uid).then((userInfo) => {
          this.setState({ userRadius: userInfo.radius });
        });
        if (this.state.dev) {
          this.setState({
            currentUser,
            locationAndError: { location: { latitude: 53.4758302, longitude: -2.2465945 } },
            nearbyUsers: [],
          });
          // ---------------
        } else {
          getUserLocation(currentUser, (err1, locationAndError) => {
            this.setState(
              {
                currentUser,
                locationAndError,
              },
              () => {
                filterUsersByDistance(this.state.currentUser, (err2, nearbyUsers) => {
                  const nearbyUsersArray = Object.entries(nearbyUsers);
                  this.setState({ nearbyUsers: nearbyUsersArray });
                });
              },
            );
          });
        }
      } else {
        // presumably some type of error handling?
        this.setState({
          currentUser,
          locationAndError: { location: { latitude: 37.422, longitude: -122.084 } },
        });
      }
    });
  }

  render() {
    const {
      locationAndError, nearbyUsers, currentUser, userRadius,
    } = this.state;
    const { navigation } = this.props;
    console.log(locationAndError, 'locationAndError');
    if (!locationAndError) {
      return <Loading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation}>
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
                radius={userRadius}
                fillColor="rgba(204, 210, 192, 0.5)"
                style={{ opacity: 0.5 }}
              />
            </Expo.MapView>

            <Users
              style={{ flex: 1 }}
              currentUser={currentUser}
              users={nearbyUsers}
              onSelectUser={(user) => {
                navigation.push('Profile', { selectedUser: user, currentUser, nearbyUsers });
              }}
            />
          </>
        </MenuWrapper>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
