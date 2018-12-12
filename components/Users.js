import React from 'react';
import {
  Text, View, ScrollView, Button,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';

/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

const theme = getTheme();

const Users = (props) => {
  const { users, navigation } = props;
  return (
    <ScrollView>
      {users.map(user => (
        <View style={theme.cardStyle} key={user.name}>
          <Text style={theme.cardActionStyle}>
            {user.name}
            {' '}
          </Text>
          <Text style={theme.cardContentStyle}>
            Interests: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis
            pellentesque lacus eleifend lacinia...
          </Text>
          <Button title="chat" onPress={() => navigation.navigate('ChatScreen')} />
        </View>
      ))}
    </ScrollView>
  );

  // return <ScrollView style={{ flex: 1 }}>{this.props.user}</ScrollView>;
};

Users.propTypes = {
  navigation: { navigate: PropTypes.func.isRequired },
  users: PropTypes.array.isRequired,
};

export default Users;
