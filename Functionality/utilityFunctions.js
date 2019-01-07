import { Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { isPointInCircle, getDistance } from 'geolib';

const { firestore } = require('../config');

const getUserLocation = async (user, cb) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  const errorMessage = 'Permission to access location was denied.';
  if (status !== 'granted') {
    return {
      location: {
        latitude: null,
        longitude: null,
      },
      errorMessage,
    };
  }
  return Location.getCurrentPositionAsync({}).then((location) => {
    const { latitude, longitude } = location.coords;
    return firestore
      .collection('users')
      .doc(user.uid)
      .update({
        location: {
          latitude,
          longitude,
        },
      })
      .then(() => {
        const newObj = {
          location: {
            latitude,
            longitude,
          },
          errorMessage: null,
        };
        return cb(null, newObj);
      });
  });
};

const getLoggedInUsers = () => firestore
  .collection('users')
  .where('loggedIn', '==', true)
  .get()
  .then((snapshot) => {
    if (snapshot.empty) {
      return [];
    }
    const userDocs = [];
    snapshot.forEach((doc) => {
      userDocs.push([doc.data(), doc.id]);
    });
    return userDocs;
  });

const filterUsersByDistance = async (user, cb) => {
  const userDocs = await getLoggedInUsers();
  // if (!userDocs.length) {
  //   console.log('No users nearby');
  // } else {
  let currentUserRadius;
  let currentUserLocation;
  userDocs.forEach((doc) => {
    if (doc.includes(user.uid)) {
      const { radius, location } = doc[0];
      currentUserRadius = radius;
      currentUserLocation = location;
    }
  });
  const nearbyUsersObj = userDocs.reduce((nearbyUsers, cur) => {
    if (cur[0].location.latitude || cur[0].location.longitude) {
      const distance = getDistance(currentUserLocation, cur[0].location, 100);
      const userObj = cur[0];
      if (
        isPointInCircle(cur[0].location, currentUserLocation, currentUserRadius)
        // This line checks to see if the current user sits within the other users radius as well
        // && isPointInCircle(currentUserLocation, cur[0].location, cur[0].radius)
      ) {
        /* eslint no-param-reassign: 0 */
        nearbyUsers[cur[1]] = { ...userObj, distance };
      }
    }
    return nearbyUsers;
  }, {});
  cb(null, nearbyUsersObj);
  // }
};

const logOut = () => {
  const { currentUser } = firebase.auth();
  firebase
    .auth()
    .signOut()
    .then(() => {
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .update({ loggedIn: false });
    });
};

const getCurrentUserInfo = uid => firestore
  .collection('users')
  .doc(uid)
  .get()
  .then(snapshot => snapshot.data());

export {
  getUserLocation, getLoggedInUsers, filterUsersByDistance, logOut, getCurrentUserInfo,
};
