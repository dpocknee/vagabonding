import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Expo from 'expo';
import propTypes from 'prop-types';
import Hamburger from './Hamburger';

/* eslint react/forbid-prop-types: 0 */

export default class MapScreen extends Component {
  static navigationOptions = () => ({
    // { navigation }
    headerTransparent: true,
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
  };

  componentDidMount() {
    this.getlocation();
  }

  getlocation = async () => {
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    // if (status !== 'granted') {
    console.log('STATUS', status);
    const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
    // console.log('OLD TRAFFORD', oldTrafford);
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

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
        }}
      >
        {/* <Drawer
          type="overlay"
          styles={drawerStyles}
          side="top"
          ref={(ref) => {
            this.drawer = ref;
          }}
          content={(
            <Sidebar
              navigator={this.navigator}
              allNav={this.allNav}
              onPress={this.closeDrawer}
              closer={this.closeDrawer}
            />
)}
          onClose={() => this.closeDrawer()}
        >
          <Button iconLeft transparent onPress={() => this.toggleDrawer()} width={50}>
            <Icon type="FontAwesome" name="bars" />
          </Button> */}
        <Hamburger allNav={this.allNav}>
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
        {/* </Drawer> */}
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: propTypes.object.isRequired,
};
