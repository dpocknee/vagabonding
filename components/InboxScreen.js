import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import MenuWrapper from './MenuWrapper';
import Inbox from './Inbox';
import { colorSettings } from '../styles/Colors.styles';

export default class InboxScreen extends Component {
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
        <Icon type="FontAwesome" name="bars" style={{ color: colorSettings.iconColor }} />
      </Button>
    ),
    title: 'Inbox',
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

    return (
      <View style={{ flex: 1 }}>
        <MenuWrapper navigation={navigation} currentPage="inbox" buttonState={this.state.button}>
          <Inbox
            allNav={(chatProps) => {
              navigation.push('Chat', chatProps);
            }}
            navigation={navigation}
          />
        </MenuWrapper>
      </View>
    );
  }
}

InboxScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
