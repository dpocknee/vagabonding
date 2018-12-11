import React, { Component } from 'react';
import { Drawer, Button, Icon } from 'native-base';
import propTypes from 'prop-types';
import Sidebar from './Sidebar';

/* eslint no-underscore-dangle: 0 */

export default class Hamburger extends Component {
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
    const { allNav, children } = this.props;
    return (
      <Drawer
        type="overlay"
        styles={drawerStyles}
        side="top"
        ref={(ref) => {
          this.drawer = ref;
        }}
        content={(
          <Sidebar
            // navigator={this.props.navigator}
            allNav={allNav}
            onPress={this.closeDrawer}
            closer={this.closeDrawer}
          />
)}
        onClose={() => this.closeDrawer()}
      >
        <Button
          iconLeft
          transparent
          onPress={() => {
            console.log('WORKING BUTTON');
            this.openDrawer();
          }}
          width={50}
        >
          <Icon type="FontAwesome" name="bars" />
        </Button>
        {children}
      </Drawer>
    );
  }
}

Hamburger.propTypes = {
  allNav: propTypes.func.isRequired,
  children: propTypes.element.isRequired,
};
