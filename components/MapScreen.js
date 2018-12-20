import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button, Icon } from 'native-base';
import * as Expo from 'expo';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Users from './Users';
import MenuWrapper from './MenuWrapper';
import LoadingComponent from './LoadingComponent';

import MapStyle from '../styles/MapScreen.styles';
import { colorSettings } from '../styles/Colors.styles';
import { iconStyles } from '../styles/Hamburger.styles';

const {
  getUserLocation,
  getCurrentUserInfo,
  filterUsersByDistance,
} = require('../Functionality/utilityFunctions');

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('buttonChange')();
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" style={iconStyles} />
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
        style={{ marginRight: Platform.select({ ios: 15, android: 0 }) }}
      >
        <Icon type="FontAwesome" name="refresh" style={iconStyles} />
      </Button>
    ),
  });

  state = {
    locationAndError: null,
    button: false,
    dev: false,
    nearbyUsers: [],
    userCity: null, // special dev variable for computer emulators
    userRadius: null,
    // city: null, // special dev variable for computer emulators
    // which can't use GPS.
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });

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
            locationAndError: {
              location: { latitude: 53.4758302, longitude: -2.2465945 },
            },
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
                })
                  .then(() => {
                    Expo.Location.reverseGeocodeAsync(locationAndError.location).then((city) => {
                      const userCity = city[0].city;
                      this.setState({
                        userCity,
                      });
                    });
                  })
                  .catch((err) => {
                    this.props.navigation.navigate('Error', { error: err });
                  });
              },
            );
          }).catch((err) => {
            this.props.navigation.navigate('Error', { error: err });
          });
        }
      }
    });
  }

  buttonChange = () => {
    this.setState((state) => {
      const buttonClick = !state.button;
      return { button: buttonClick };
    });
  };

  render() {
    const {
      locationAndError, nearbyUsers, currentUser, userRadius, userCity,
    } = this.state;
    const { navigation } = this.props;
    if (!locationAndError) {
      return <LoadingComponent />;
    }
    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation} currentPage="map" buttonState={this.state.button}>
          <View style={nearbyUsers.length >= 2 ? { flex: 1.8 } : { flex: 3.6 }}>
            <Expo.MapView
              style={{ flex: 1 }}
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
                pinColor={colorSettings.mapPinColor}
              />
              <Expo.MapView.Circle
                center={locationAndError.location}
                radius={userRadius}
                fillColor={colorSettings.mapCircleFill}
              />
            </Expo.MapView>
          </View>
          <View style={MapStyle.users}>
            <Users
              city={userCity}
              currentUser={currentUser}
              users={nearbyUsers}
              navigation={navigation}
              onSelectUser={(user) => {
                navigation.push('Profile', {
                  selectedUser: user,
                  currentUser,
                  nearbyUsers,
                });
              }}
            />
          </View>
        </MenuWrapper>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
