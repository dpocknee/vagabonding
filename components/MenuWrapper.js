import React, { Component } from 'react';
import { Drawer, Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import { drawerStyles } from '../styles/Hamburger.styles';

export default class MenuWrapper extends Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerStatus });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.buttonState !== prevProps.buttonState) {
      this.drawerStatus();
    }
  }

  drawerStatus = () => {
    this.setState((state) => {
      const inverseDrawer = !state.isDrawerOpen;
      return { isDrawerOpen: inverseDrawer };
    });
  };

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.push(screen);
  };

  render() {
    const closeDrawer = () => {
      this.drawer._root.close();
    };

    const { children, currentPage } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <>
        <Drawer
          type="overlay"
          styles={drawerStyles}
          side="top"
          open={isDrawerOpen}
          tapToClose
          ref={(ref) => {
            this.drawer = ref;
          }}
          acceptTap
          content={(
            <Sidebar
              allNav={this.allNav}
              closeDrawer={closeDrawer}
              drawerStatus={this.drawerStatus}
              currentPage={currentPage}
            />
)}
        >
          {children}
        </Drawer>
      </>
    );
  }
}

MenuWrapper.propTypes = {};
