import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
import Inbox from './Inbox';
import colours from '../styles/Colours.styles';

export default class InboxScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
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
    title: 'Inbox',
    headerStyle: {
      backgroundColor: colours.header.backgroundColor,
    },
    headerTintColor: colours.header.color,
  });

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation}>
          <Inbox
            allNav={(chatProps) => {
              navigation.push('Chat', chatProps);
            }}
          />
        </MenuWrapper>
      </View>
    );
  }
}

InboxScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
