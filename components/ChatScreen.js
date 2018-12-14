import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
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

  render() {
    const { navigation } = this.props;
    const currentUserID = navigation.getParam('currentUserID');
    const currentUsername = navigation.getParam('currentUsername');
    const selectedUserID = navigation.getParam('selectedUserID');
    // Chat will need userID, userName and clickedUserID as props
    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation}>
          <>
            <Chat
              currentUserID={currentUserID}
              currentUsername={currentUsername}
              selectedUserID={selectedUserID}
            />
          </>
        </MenuWrapper>
      </View>
    );
  }
}

ChatScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
