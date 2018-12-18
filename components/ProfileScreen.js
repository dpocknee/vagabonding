import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
<<<<<<< HEAD
import { LinearGradient } from 'expo';
=======
>>>>>>> 9cba5fcb1226060ed436ef94eb564be040de9202
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
import profileStyles from '../styles/Profile.styles';
<<<<<<< HEAD
=======
import colours from '../styles/Colours.styles';

>>>>>>> 9cba5fcb1226060ed436ef94eb564be040de9202

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
<<<<<<< HEAD
          navigation.getParam('drawerStatus')();
=======
          navigation.getParam('buttonChange')();
>>>>>>> 9cba5fcb1226060ed436ef94eb564be040de9202
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" />
      </Button>
    ),
    title: 'Profile Page',
<<<<<<< HEAD
=======
    headerStyle: {
      backgroundColor: colours.header.backgroundColor,
    },
    headerTintColor: colours.header.color,
>>>>>>> 9cba5fcb1226060ed436ef94eb564be040de9202
  });

  state = {
    button: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });
  }

  buttonChange = () => {
    this.setState((state) => {
      const buttonClick = !state.button;
      return { button: buttonClick };
    });
  };

  render() {
    const { navigation } = this.props;
    const userId = this.props.navigation.getParam('selectedUser')[0];
    const userInfo = this.props.navigation.getParam('selectedUser')[1];
    const currentUser = this.props.navigation.getParam('currentUser');
    const nearbyUsers = this.props.navigation.getParam('nearbyUsers');
    const currentUserInfo = nearbyUsers.filter(
      user => user[0] === currentUser.uid,
    );

    const currentUsername = currentUserInfo[0][1].username;
    const interests = userInfo.interests
      ? Object.keys(userInfo.interests).reduce((outputArray, interest) => {
        if (userInfo.interests[interest]) outputArray.push(interest);
        return outputArray;
      }, [])
      : [];
    const validInterests = interests.length > 0 ? interests.join(' / ') : 'No interests given!';
    return (
<<<<<<< HEAD
      <View style={profileStyles.wholePage}>
        <LinearGradient
          colors={['rgba(225,225,225,225)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        >
          <MenuWrapper navigation={navigation}>
            <>
              <View style={profileStyles.profileBox}>
                <Icon
                  type="FontAwesome"
                  name="user-circle"
                  style={{ fontSize: 40 }}
                />

                <Text style={profileStyles.username}>{userInfo.username}</Text>
              </View>
              <View>
                <Text style={profileStyles.info}>
                  Real name:
=======
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation} currentPage="profile" buttonState={this.state.button}>
          <>
            <View style={profileStyles.profileText}>
              <Icon
                type="FontAwesome"
                name="user-circle"
                style={{ fontSize: 40 }}
              />
              <Text style={profileStyles.username}>{userInfo.username}</Text>
              <Text style={profileStyles.info}>
                Real name:
                {userInfo.name}
              </Text>
              <Text style={profileStyles.info}>
                Interests:
                {' '}
                {validInterests}
              </Text>
            </View>
            <View style={profileStyles.chat}>
              <TouchableOpacity
                style={profileStyles.button}
                onPress={() => {
                  this.props.navigation.push('Chat', {
                    currentUserID: currentUser.uid,
                    currentUsername,
                    selectedUserID: userId,
                    selectedUserUsername: userInfo.username,
                    selectedUsername: userInfo.name,
                  });
                }}
              >
                <Text>
                  Chat with
>>>>>>> 9cba5fcb1226060ed436ef94eb564be040de9202
                  {userInfo.name}
                </Text>
                <Text style={profileStyles.info}>
                  Interests:
                  {' '}
                  {validInterests}
                </Text>
              </View>
              <View style={profileStyles.chat}>
                <TouchableOpacity
                  style={profileStyles.button}
                  onPress={() => {
                    this.props.navigation.push('Chat', {
                      currentUserID: currentUser.uid,
                      currentUsername,
                      selectedUserID: userId,
                      selectedUserUsername: userInfo.username,
                      selectedUsername: userInfo.name,
                    });
                  }}
                >
                  <Text>
Chat with
                    {userInfo.name}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </MenuWrapper>
        </LinearGradient>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
