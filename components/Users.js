import React from 'react';
import {
  Text, View, ScrollView, Button, TouchableOpacity, Image,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';

import PTRView from 'react-native-pull-to-refresh';
import travel from '../images/travel2.jpg';
import LoadingComponent from './LoadingComponent';

const theme = getTheme();

const Users = (props) => {
  const {
    users, onSelectUser, currentUser, navigation, city,
  } = props;
  const _refresh = () => {
    const refreshPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    return refreshPromise.then(() => navigation.push('Map'));
  };
  if (!users) {
    return <LoadingComponent />;
  }
  return users.length >= 1 ? (
    <PTRView onRefresh={_refresh}>
      <ScrollView style={[{ flex: 1 }, { backgroundColor: '#F56463' }, { borderRadius: 5 }]}>
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
          {`Scroll down to see users nearby in ${city}`}
        </Text>
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
    </PTRView>
  ) : (
    <PTRView onRefresh={_refresh}>
      <ScrollView style={[{ flex: 1 }, { backgroundColor: '#F56463' }, { borderColor: 'black' }]}>
        <View
          style={[
            theme.cardStyle,
            { padding: 30 },
            { backgroundColor: '#1D9FBF' },
            { marginTop: 15 },
            { borderWidth: 1 },
            { borderRadius: 2 },
          ]}
        >
          {/* <Image source={{ uri: base64Icon }} style={[theme.cardImageStyle]} /> */}
          <Text style={[{ textAlign: 'center' }, { color: 'white' }, { fontSize: 18 }]}>
            Refresh to see nearby users
          </Text>
        </View>
      </ScrollView>
    </PTRView>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Users;
