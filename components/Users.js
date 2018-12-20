import React from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import PTRView from 'react-native-pull-to-refresh';
import LoadingComponent from './LoadingComponent';
import { colorSettings } from '../styles/Colors.styles';
import cardStyles from '../styles/Users.styles';

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
      <ScrollView style={cardStyles.scrollView}>
        <Text style={cardStyles.header}>{`Scroll down to see users nearby in ${city}`}</Text>
        {users.map(
          user => user[0] !== currentUser.uid && (
          <TouchableOpacity
            onPress={() => onSelectUser(user)}
            style={cardStyles.opacity}
            key={user[0]}
          >
            <Text style={[theme.cardActionStyle, ...cardStyles.cardActionStyle]}>
              {user[1].name}
              {' '}
            </Text>
            <Text style={[theme.cardContentStyle, ...cardStyles.cardContentStyle]}>
              {user[1].distance === 0 ? 'Less than 100' : user[1].distance}
m away
            </Text>
          </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </PTRView>
  ) : (
    <PTRView onRefresh={_refresh} style={{ backgroundColor: colorSettings.usersNoNearbyUsers }}>
      <View style={[{ flex: 1 }]}>
        <Text
          style={[
            { textAlign: 'center' },
            { color: colorSettings.mainText },
            { fontSize: 25 },
            { marginTop: '15%' },
          ]}
        >
          There are no nearby users
        </Text>
        <Text
          style={[
            theme.cardContentStyle,
            ...cardStyles.cardContentStyle,
            { textAlign: 'center' },
            { marginTop: 10 },
          ]}
        >
          Pull to refresh
          {' '}
        </Text>
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
