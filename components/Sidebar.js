import React from 'react';
import { Text, View } from 'react-native';
import {
  Container, Content, Button, Icon,
} from 'native-base';
import propTypes from 'prop-types';
import { logOut } from '../Functionality/utilityFunctions';
import { sidebarStyles, iconStyles } from '../styles/Hamburger.styles';

const Sidebar = (props) => {
  const {
    closeDrawer, allNav, drawerStatus, currentPage,
  } = props;
  return (
    <Container style={sidebarStyles.container}>
      <Content style={currentPage === 'map' ? sidebarStyles.contentMap : sidebarStyles.content}>
        <View style={{ marginTop: '15%' }}>
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
            <Icon type="FontAwesome" name="map" style={iconStyles} />
            <Text style={sidebarStyles.menuTextStyle}>Map</Text>
          </Button>
        </View>
        <View style={{ marginTop: '8%' }}>
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
            <Icon type="FontAwesome" name="envelope" style={iconStyles} />
            <Text style={sidebarStyles.menuTextStyle}>Inbox</Text>
          </Button>
        </View>
        <View style={[{ marginTop: '8%' }]}>
          <Button
            iconLeft
            transparent
            primary
            title="CreateEvent"
            onPress={() => {
              drawerStatus();
              closeDrawer();
              allNav('CreateEvent');
            }}
          >
            <Icon type="FontAwesome" name="calendar" style={iconStyles} />
            <Text style={sidebarStyles.menuTextStyle}>Create Event</Text>
          </Button>
        </View>
        <View style={[{ marginTop: '8%' }]}>
          <Button
            iconLeft
            transparent
            primary
            title="NearbyEvents"
            onPress={() => {
              closeDrawer();
              drawerStatus();
              allNav('NearbyEvents');
            }}
          >
            <Icon type="FontAwesome" name="users" style={iconStyles} />
            <Text style={sidebarStyles.menuTextStyle}>Nearby Events</Text>
          </Button>
        </View>
        <View style={{ marginTop: '8%' }}>
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
            <Icon type="FontAwesome" name="hand-o-left" style={iconStyles} />
            <Text style={sidebarStyles.menuTextStyle}>Logout</Text>
          </Button>
        </View>
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
