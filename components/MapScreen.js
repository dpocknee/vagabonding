import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import * as Expo from 'expo';
import propTypes from 'prop-types';
import Hamburger from './Hamburger';

/* eslint react/forbid-prop-types: 0 */

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    // { navigation }
    headerTransparent: true,
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('drawerStatus')();
          // console.log(navigation.state.params);
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" />
      </Button>
    ),
    //   <Hamburger
    //     allNav={(screen) => {
    //       const { navigation } = this.props;
    //       navigation.navigate(screen);
    //     }}
    //   />
    // ),
    // onPress: console.log('PRESSED!'),
    // headerLeft: (
    //   <Button
    //     title="burger navbar"
    //     onPress={() => {
    //       console.log('sidebar');
    //     }}
    //   >
    //     <Text>Hiya!!!</Text>
    //   </Button>
    // ),
  });

  state = {
    location: null,
    where: null,
    isDrawerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerSatus });
    this.getlocation();
  }

  drawerSatus = () => {
    // console.log('WOOHAH!');
    this.setState((state) => {
      const inverseDrawer = !state.isDrawerOpen;
      return { isDrawerOpen: inverseDrawer };
    });
  };

  getlocation = async () => {
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    // if (status !== 'granted') {
    console.log('STATUS', status);
    const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
    this.setState({
      location: { coords: oldTrafford },
      where: { coords: oldTrafford },
    });
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
  };

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { location, where } = this.state;
    if (!location) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}
        >
          <Text>Home Screen</Text>
        </View>
      );
    }
    const { isDrawerOpen } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
        }}
      >
        <Hamburger allNav={this.allNav} isDrawerOpen={isDrawerOpen}>
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
        </Hamburger>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: propTypes.object.isRequired,
};
