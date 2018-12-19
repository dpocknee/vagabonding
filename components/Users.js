import React from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import PTRView from 'react-native-pull-to-refresh';
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
  return users.length >= 2 ? (
    <PTRView onRefresh={_refresh}>
      <ScrollView
        style={[{ flex: 1 }, { backgroundColor: 'rgba(225, 225, 225)' }, { borderRadius: 5 }]}
        // rgba(245, 100, 99, 0.3)'
      >
        {/* welcome card start */}
        {/* <Image source={travel} style={[{ resizeMode: 'contain' }]} /> */}
        <Text
          style={[
            { fontSize: 15 },
            { textAlign: 'center' },
            { backgroundColor: 'transparent' },
            { margin: 0 },
            { borderColor: '#FFFFFF' },
            { color: 'black' },
            { padding: 5 },
            { paddingBottom: 10 },
            { marginTop: 2.5 },
          ]}
        >
          {`Scroll down to see users nearby in ${city}`}
        </Text>
        {users.map(
          user => user[0] !== currentUser.uid && (
          <TouchableOpacity
            onPress={() => onSelectUser(user)}
            style={[
              theme.cardStyle,
              { backgroundColor: 'rgba(29, 159, 191, 0.7)' },
              { marginRight: 5 },
              { marginLeft: 5 },
              { marginTop: 5 },
              { marginBottom: 5 },
              { borderRadius: 5 },
              { borderColor: 'rgba(29, 159, 191, 0.7)' },
            ]}
            key={user[1].name}
          >
            <Text style={[theme.cardActionStyle, { color: '#16324F' }, { fontSize: 22 }]}>
              {user[1].name}
              {' '}
            </Text>
            <Text style={[theme.cardContentStyle, { color: 'rgba(255, 255, 255, 0.9)' }]}>
              {user[1].distance === 0 ? 'Less than 100' : user[1].distance}
m away
            </Text>
          </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </PTRView>
  ) : (
    <PTRView onRefresh={_refresh} style={{ backgroundColor: '#1D9FBF' }}>
      <View style={[{ flex: 1 }, { backgroundColor: '#1D9FBF' }]}>
        <View
          style={[
            theme.cardStyle,
            { padding: 30 },
            { backgroundColor: '#1D9FBF' },
            { borderColor: '#1D9FBF' },
            { borderRadius: 2 },
            { paddingTop: 50 },
          ]}
        >
          <Text style={[{ textAlign: 'center' }, { color: 'white' }, { fontSize: 18 }]}>
            There are no nearby users
          </Text>
        </View>
      </View>
    </PTRView>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Users;
