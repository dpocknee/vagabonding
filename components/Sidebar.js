import React from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Button, Icon,
} from 'native-base';
import propTypes from 'prop-types';

const Sidebar = (props) => {
  const { closeDrawer, allNav, drawerStatus } = props;
  const menuTextStyle = { left: 5, color: 'darkblue' };
  return (
    <Container
      style={{
        backgroundColor: 'white',
        opacity: 0.8,
        width: 150,
        flex: 0.5,
        paddingTop: 20,
      }}
    >
      <Content style={{ paddingTop: 50 }}>
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
          <Text style={menuTextStyle}>Map</Text>
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
          <Text style={menuTextStyle}>Inbox</Text>
        </Button>
        <Button
          iconLeft
          transparent
          primary
          title="Logout"
          onPress={() => {
            closeDrawer();
            drawerStatus();
            allNav('Logout');
          }}
        >
          <Icon type="FontAwesome" name="times" />
          <Text style={menuTextStyle}>Logout</Text>
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
          <Text style={menuTextStyle}>Close</Text>
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
