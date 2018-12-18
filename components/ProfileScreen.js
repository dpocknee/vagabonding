import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
import profileStyles from '../styles/Profile.styles';
import { generalStyling } from '../styles/generalStyling.styles';
import { colorSettings } from '../styles/Colors.styles';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('buttonChange')();
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" />
      </Button>
    ),
    title: 'Profile Page',
    headerStyle: {
      backgroundColor: colorSettings.headerColor,
    },
    headerTintColor: colorSettings.headerTintColor,
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
    const currentUserInfo = nearbyUsers.filter(user => user[0] === currentUser.uid);
    const currentUsername = currentUserInfo[0][1].username;
    const interests = userInfo.interests
      ? Object.keys(userInfo.interests).reduce((outputArray, interest) => {
        if (userInfo.interests[interest]) outputArray.push(interest);
        return outputArray;
      }, [])
      : [];
    const validInterests = interests.length > 0 ? interests.join(' / ') : 'No interests given!';
    return (
      <View style={profileStyles.wholePage}>
        <MenuWrapper navigation={navigation} currentPage="profile" buttonState={this.state.button}>
          <>
            <LinearGradient
              colors={['rgba(225,225,225,225)', 'transparent']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                // height: 300
              }}
            >
              <View style={profileStyles.profileBox}>
                <Icon
                  type="FontAwesome"
                  name="user-circle"
                  style={{ fontSize: 50, alignSelf: 'center' }}
                />

                <Text style={profileStyles.username}>{userInfo.username}</Text>
              </View>
              <View>
                <Text style={profileStyles.info}>
                  <Text>
                    <Text style={profileStyles.catInfo}>Real name:</Text>
                    {' '}
                    {userInfo.name}
                    {'\n'}
                  </Text>
                  <Text>
                    <Text style={profileStyles.catInfo}>Interests:</Text>
                    {' '}
                    {validInterests}
                  </Text>
                </Text>
              </View>
              {/* <View style={profileStyles.chat}> */}
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                  style={generalStyling.longButton}
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
                  <Text style={generalStyling.buttonText}>{`Chat with ${userInfo.name}`}</Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </LinearGradient>
          </>
        </MenuWrapper>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
