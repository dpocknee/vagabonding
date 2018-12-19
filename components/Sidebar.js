import React from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Button, Icon,
} from 'native-base';
import propTypes from 'prop-types';
import { logOut } from '../Functionality/utilityFunctions';
import { sidebarStyles } from '../styles/Hamburger.styles';
import { colorSettings } from '../styles/Colors.styles';

const { iconColor } = colorSettings;

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
          <Icon type="FontAwesome" name="map" style={{ color: iconColor }} />
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
          <Icon type="FontAwesome" name="envelope" style={{ color: iconColor }} />
          <Text style={sidebarStyles.menuTextStyle}>Inbox</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Create Event"
          onPress={() => {
            closeDrawer();
            allNav('CreateEvent');
          }}
        >
          <Icon type="FontAwesome" name="envelope" style={{ color: iconColor }} />
          <Text style={sidebarStyles.menuTextStyle}>Create Event</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Nearby Events"
          onPress={() => {
            closeDrawer();
            allNav('NearbyEvents');
          }}
        >
          <Icon type="FontAwesome" name="envelope" style={{ color: iconColor }} />
          <Text style={sidebarStyles.menuTextStyle}>Nearby Events</Text>
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
          <Icon type="FontAwesome" name="hand-o-left" style={{ color: iconColor }} />
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
          <Icon type="FontAwesome" name="times" style={{ color: iconColor }} />
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
