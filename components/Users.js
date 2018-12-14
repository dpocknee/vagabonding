import React from 'react';
import {
  Text, View, ScrollView, Button, TouchableOpacity,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';

/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

const theme = getTheme();

const Users = (props) => {
  const { users, onSelectUser, currentUser } = props;
  return (
    <ScrollView>
      {users.map(
        user => user[0] !== currentUser.uid && (
        <TouchableOpacity
          onPress={() => onSelectUser(user)}
          style={theme.cardStyle}
          key={user[1].name}
        >
          <Text style={theme.cardActionStyle}>
            {user[1].name}
            {' '}
          </Text>
          <Text style={theme.cardContentStyle}>
            {user[1].distance === 0 ? 'Less Than 100' : user[1].distance}
m away
          </Text>
        </TouchableOpacity>
        ),
      )}
    </ScrollView>
  );
};

Users.propTypes = {
  navigation: { navigate: PropTypes.object.isRequired },
  users: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Users;
