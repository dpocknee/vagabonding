import React from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import PTRView from 'react-native-pull-to-refresh';
import LoadingComponent from './LoadingComponent';
import { colorSettings } from '../styles/Colors.styles';

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
      <ScrollView
        style={[{ flex: 1 }, { backgroundColor: colorSettings.usersBackground }, { borderRadius: 5 }]}
      >
        <Text
          style={[
            { fontSize: 15 },
            { textAlign: 'center' },
            { backgroundColor: 'transparent' },
            { margin: 0 },
            { borderColor: colorSettings.usersTitleBorder },
            { color: colorSettings.usersTitleText },
            { padding: 5 },
            { paddingBottom: 10 },
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
              { backgroundColor: colorSettings.usersCardBackground },
              { marginRight: 10 },
              { marginLeft: 10 },
              { marginTop: 5 },
              { marginBottom: 5 },
              { borderRadius: 5 },
              { borderColor: colorSettings.usersCardBorder },
            ]}
            key={user[1].name}
          >
            <Text style={[theme.cardActionStyle, { color: colorSettings.usersCardAction }, { fontSize: 17 }]}>
              {user[1].name}
              {' '}
            </Text>
            <Text style={[theme.cardContentStyle, { color: colorSettings.usersCardContent }]}>
              {user[1].distance === 0 ? 'Less than 100' : user[1].distance}
m away
            </Text>
          </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </PTRView>
  ) : (
    <PTRView onRefresh={_refresh} style={{ backgroundColor: colorSettings.usersBackground }}>
      <View style={[{ flex: 1 }, { backgroundColor: colorSettings.usersBackground }]}>
        <View
          style={[
            theme.cardStyle,
            { padding: 30 },
            { backgroundColor: colorSettings.usersTitleText },
            { borderColor: colorSettings.usersTitleBorder },
            { borderRadius: 2 },
            { paddingTop: 50 },
          ]}
        >
          <Text style={[{ textAlign: 'center' }, { color: colorSettings.lightText }, { fontSize: 18 }]}>
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
