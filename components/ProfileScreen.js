import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
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
    const userId = this.props.navigation.getParam('selectedUser')[0];
    const userInfo = this.props.navigation.getParam('selectedUser')[1];
    const currentUser = this.props.navigation.getParam('currentUser');
    const interests = Object.keys(userInfo.interests).reduce((outputArray, interest) => {
      if (userInfo.interests[interest]) outputArray.push(interest);
      return outputArray;
    }, []);
    const validInterests = interests.length > 0 ? interests.join(' / ') : 'No interests given!';
    return (
      <View style={{ flex: 1 }}>
        <Hamburger
          allNav={this.allNav}
          isDrawerOpen={isDrawerOpen}
          drawerStatus={this.drawerStatus}
        >
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
                this.props.navigation.navigate('Chat', {
                  currentUserID: currentUser.uid,
                  currentUsername: 'Aaron',
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
        </Hamburger>
      </View>
    );
  }
}

// Chat will need userID, userName and clickedUserID as props

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
