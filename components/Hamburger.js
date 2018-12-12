import React, { Component } from 'react';
import { Drawer } from 'native-base';
import propTypes from 'prop-types';
import Sidebar from './Sidebar';
import drawerStyles from '../styles/Hamburger.styles';
/* eslint no-underscore-dangle: 0 */

export default class Hamburger extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const {
      allNav, children, isDrawerOpen, drawerStatus,
    } = this.props;
    // console.log('PROPS', isDrawerOpen);
    if (isDrawerOpen) {
      this.openDrawer();
    }
    return (
      <Drawer
        type="overlay"
        styles={drawerStyles}
        side="top"
        ref={(ref) => {
          this.drawer = ref;
        }}
        acceptTap
        // onPress={() => console.log(this.drawer)}
        content={(
          <Sidebar
            // navigator={this.props.navigator}
            allNav={allNav}
            closeDrawer={this.closeDrawer}
            drawerStatus={drawerStatus}
          />
)}
      >
        {children}
      </Drawer>
    );
  }
}

Hamburger.propTypes = {
  allNav: propTypes.func.isRequired,
  children: propTypes.element.isRequired,
  isDrawerOpen: propTypes.bool.isRequired,
  drawerStatus: propTypes.func.isRequired,
};
