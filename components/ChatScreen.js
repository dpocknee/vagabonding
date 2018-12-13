import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
import Chat from './Chat';

export default class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('drawerStatus')();
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" />
      </Button>
    ),
  });

  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ drawerStatus: this.drawerStatus });
  }

  drawerStatus = () => {
    this.setState(state => ({ isDrawerOpen: !state.isDrawerOpen }));
  };

  allNav = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  render() {
    const { isDrawerOpen } = this.state;
    const { navigation } = this.props;
    const currentUserID = navigation.getParam('currentUserID');
    const currentUsername = navigation.getParam('currentUsername');
    const selectedUserID = navigation.getParam('selectedUserID');
    // Chat will need userID, userName and clickedUserID as props
    return (
      <View style={{ flex: 1 }}>
        <Hamburger
          allNav={this.allNav}
          isDrawerOpen={isDrawerOpen}
          drawerStatus={this.drawerStatus}
        >
          <>
            <Text>The Chat page has loaded!</Text>
            <Chat
              currentUserID={currentUserID}
              currentUsername={currentUsername}
              selectedUserID={selectedUserID}
            />
          </>
        </Hamburger>
      </View>
    );
  }
}

ChatScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
