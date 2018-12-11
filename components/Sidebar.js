import React from 'react';
import { Text } from 'react-native';
import {
  Container, Content, Button, Icon,
} from 'native-base';
import propTypes from 'prop-types';

const Sidebar = (props) => {
  const { closer, allNav } = props;
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
      <Content>
        <Button
          iconLeft
          transparent
          primary
          style={{
            height: 50,
            width: 50,
            left: 0,
          }}
          onPress={() => closer()}
        >
          <Icon type="FontAwesome" name="bars" />
        </Button>

        <Button iconLeft transparent primary title="Map" onPress={() => allNav('Map')}>
          <Icon type="FontAwesome" name="map" />
          <Text style={menuTextStyle}>Map</Text>
        </Button>
        <Button iconLeft transparent primary title="Inbox" onPress={() => allNav('Inbox')}>
          <Icon type="FontAwesome" name="envelope" />
          <Text style={menuTextStyle}>Inbox</Text>
        </Button>
        <Button iconLeft transparent primary title="Logout" onPress={() => allNav('Logout')}>
          <Icon type="FontAwesome" name="times" />
          <Text style={menuTextStyle}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
};

Sidebar.propTypes = {
  closer: propTypes.func.isRequired,
  allNav: propTypes.func.isRequired,
};

export default Sidebar;
