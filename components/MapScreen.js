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
    mapLoading: true,
    locationAndError: null,
    button: false,
    nearbyUsers: [],
    userCity: null, // special dev variable for computer emulators
    userRadius: null,
    // city: null, // special dev variable for computer emulators
    // which can't use GPS.
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });

    return firebase.auth().onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        return this.setState({ mapLoading: false }, () => navigation.navigate('Error', { error: 'No current user!' }));
      }
      return Promise.all([
        getCurrentUserInfo(currentUser.uid),
        getUserLocation(currentUser, (err, locationAndError) => {
          if (err) return Promise.reject(err);
          return locationAndError;
        }),
        filterUsersByDistance(currentUser, (err, nearbyUsers) => {
          if (err) return Promise.reject(err);
          return Object.entries(nearbyUsers);
        }),
      ])
        .then(([userInfo, locationAndError, nearbyUsersArray]) => {
          this.setState({
            currentUser,
            userRadius: userInfo.radius,
            locationAndError,
            nearbyUsers: nearbyUsersArray,
          });
          return Expo.Location.reverseGeocodeAsync(locationAndError.location);
        })
        .then((city) => {
          console.log('Loaded address information');
          return this.setState({
            userCity: city[0].city,
            mapLoading: false,
          });
        })
        .catch(err => this.setState(
          {
            mapLoading: false,
          },
          () => navigation.navigate('Error', { error: err }),
        ));
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
      locationAndError,
      nearbyUsers,
      currentUser,
      userRadius,
      userCity,
      mapLoading,
    } = this.state;
    const { navigation } = this.props;
    if (mapLoading) {
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
