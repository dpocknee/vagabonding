import React from 'react';
import {
  Text, View, ScrollView, Button, TouchableOpacity, Image,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';

import travel from '../images/travel2.jpg';

/* eslint react/require-default-props: 0 */
/* eslint react/forbid-prop-types: 0 */

const theme = getTheme();

const Users = (props) => {
  const { users, onSelectUser, currentUser } = props;
  const base64Icon = 'http://www.getmdl.io/assets/demos/welcome_card.jpg';
  return users.length >= 1 ? (
    <ScrollView style={{ flex: 1 }}>
      {/* welcome card start */}
      <Image source={travel} style={[{ resizeMode: 'contain' }]} />
      <Text
        style={[
          { fontSize: 15 },
          { textAlign: 'center' },
          { backgroundColor: '#1D9FBF' },
          { margin: 0 },
          { borderWidth: 1 },
          { borderRadius: 3 },
          { borderColor: '#FFFFFF' },
          { color: '#FFFFFF' },
          { padding: 5 },
        ]}
      >
        Scroll down to see those nearby in Manchester
      </Text>
      {/* welcome card end */}
      {users.map(
        user => user[0] !== currentUser.uid && (
        <TouchableOpacity
          onPress={() => onSelectUser(user)}
          style={[theme.cardStyle, { backgroundColor: '#1D9FBF' }, { margin: 0 }]}
          key={user[1].name}
        >
          <Text style={[theme.cardActionStyle, { color: '#16324F' }]}>
            {user[1].name}
            {' '}
          </Text>
          <Text style={[theme.cardContentStyle, { color: '#16324F' }]}>
            {user[1].distance === 0 ? 'Less than 100' : user[1].distance}
m away
          </Text>
        </TouchableOpacity>
        ),
      )}
    </ScrollView>
  ) : (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={[
          theme.cardStyle,
          { padding: 30 },
          { backgroundColor: '#1D9FBF' },
          { marginTop: 15 },
        ]}
      >
        {/* <Image source={{ uri: base64Icon }} style={[theme.cardImageStyle]} /> */}
        <Text style={[{ textAlign: 'center' }, { color: 'white' }, { fontSize: 18 }]}>
          Refresh to see nearby users
        </Text>
      </View>
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
