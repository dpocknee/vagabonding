import React from 'react';
import {
  Text, View, ScrollView, Button, TouchableOpacity,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';

const theme = getTheme();

const Users = (props) => {
  const { users, onSelectUser } = props;
  return (
    <ScrollView>
      {users.map(user => (
        <TouchableOpacity
          onPress={() => onSelectUser(user)}
          style={theme.cardStyle}
          key={user.name}
        >
          <Text style={theme.cardActionStyle}>
            {user.name}
            {' '}
          </Text>
          <Text style={theme.cardContentStyle}>
            Interests: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis
            pellentesque lacus eleifend lacinia...
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

Users.propTypes = {
  navigation: { navigate: PropTypes.object.isRequired },
  users: PropTypes.array.isRequired,
};

export default Users;
