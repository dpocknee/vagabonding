import React from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Button, Icon,
} from 'native-base';
import propTypes from 'prop-types';
import { logOut } from '../Functionality/utilityFunctions';
import { sidebarStyles } from '../styles/Hamburger.styles';

const Sidebar = (props) => {
  const {
    closeDrawer, allNav, drawerStatus, currentPage,
  } = props;
  return (
    <Container style={sidebarStyles.container}>
      <Content style={currentPage === 'map' ? sidebarStyles.contentMap : sidebarStyles.content}>
        <Button
          iconLeft
          transparent
          primary
          title="Map"
          onPress={() => {
            closeDrawer();
            allNav('Map');
          }}
        >
          <Icon type="FontAwesome" name="map" />
          <Text style={sidebarStyles.menuTextStyle}>Map</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Inbox"
          onPress={() => {
            closeDrawer();
            drawerStatus();
            allNav('Inbox');
          }}
        >
          <Icon type="FontAwesome" name="envelope" />
          <Text style={sidebarStyles.menuTextStyle}>Inbox</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Logout"
          onPress={() => {
            closeDrawer();
            drawerStatus();
            logOut();
            allNav('loginFlow');
          }}
        >
          <Icon type="FontAwesome" name="hand-o-left" />
          <Text style={sidebarStyles.menuTextStyle}>Logout</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Close"
          onPress={() => {
            drawerStatus();
            closeDrawer();
          }}
        >
          <Icon type="FontAwesome" name="times" />
          <Text style={sidebarStyles.menuTextStyle}>Close Menu</Text>
        </Button>
      </Content>
    </Container>
  );
};

Sidebar.propTypes = {
  closeDrawer: propTypes.func.isRequired,
  allNav: propTypes.func.isRequired,
  drawerStatus: propTypes.func.isRequired,
};

export default Sidebar;
