import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
import profileStyles from '../styles/Profile.styles';

export default class Profile extends Component {
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
    const userId = this.props.navigation.getParam('selectedUser')[0];
    const userInfo = this.props.navigation.getParam('selectedUser')[1];
    const currentUser = this.props.navigation.getParam('currentUser');
    const nearbyUsers = this.props.navigation.getParam('nearbyUsers');
    const currentUserInfo = nearbyUsers.filter(user => user[0] === currentUser.uid);

    console.log('CURRENT USER INFO: ', currentUserInfo);
    const currentUsername = currentUserInfo[0][1].username;
    const interests = Object.keys(userInfo.interests).reduce((outputArray, interest) => {
      if (userInfo.interests[interest]) outputArray.push(interest);
      return outputArray;
    }, []);
    const validInterests = interests.length > 0 ? interests.join(' / ') : 'No interests given!';
    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation}>
          <>
            <View style={profileStyles.profileText}>
              <Icon type="FontAwesome" name="user-circle" style={{ fontSize: 40 }} />
              <Text style={profileStyles.username}>{userInfo.username}</Text>
              <Text>
                Real name:
                {userInfo.name}
              </Text>
              <Text>
                Interests:
                {validInterests}
              </Text>
            </View>

            <Button
              onPress={() => {
                this.props.navigation.push('Chat', {
                  currentUserID: currentUser.uid,
                  currentUsername,
                  selectedUserID: userId,
                });
              }}
            >
              <Text>
                Chat with
                {userInfo.name}
!
              </Text>
            </Button>
          </>
        </MenuWrapper>
      </View>
    );
  }
}

// Chat will need userID, userName and clickedUserID as props

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
