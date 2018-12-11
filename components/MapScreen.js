import React, { Component } from 'react';
import { View } from 'react-native';
import * as Expo from 'expo';
import { Drawer, Button, Icon } from 'native-base';
import Sidebar from './Sidebar';

/* eslint no-underscore-dangle: 0 */

export default class App extends Component {
  static navigationOptions = () => ({
    // { navigation }
    headerTransparent: true,
    headerLeft: <Button title="burger navbar" onPress={() => alert('burger pop out')} />,
  });
  // headerLeft: <Button title="burger navbar" onPress={() => {navigation.navigate('sidebar')}} />,

  state = {
    location: null,
    where: null,
  };

  componentDidMount() {
    this.getlocation();
  }

  getlocation = async () => {
    const { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      const oldTrafford = (await Expo.Location.geocodeAsync('Sir Matt Busby Way'))[0];
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

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  toggleDrawer = () => {
    this.drawer._root.toggle();
  };

  render() {
    const { location, where } = this.state;
    if (!location) {
      return <View />;
    }
    const drawerStyles = {
      drawer: {
        backgroundColor: 'transparent',
        height: 100,
      },
      main: {
        paddingLeft: 3,
        backgroundColor: 'transparent',
      },
      drawerOverlay: {
        opacity: 0,
      },
      mainOverlay: {
        opacity: 0,
        backgroundColor: 'black',
        shadowColor: '#000000',
        shadowOpacity: 0.8,
      },
      // Check here for native-base drawer styles: https://github.com/root-two/react-native-drawer
      // The native-base drawer component uses the same props as react-native-drawer.
    };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}
      >
        <Drawer
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
          </Button>
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
        </Drawer>
      </View>
    );
  }
}
