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
  await Location.getCurrentPositionAsync({}).then((location) => {
    const { latitude, longitude } = location.coords;
    firestore
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
        cb(null, newObj);
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
  let radius;
  let currentUserLocation;
  userDocs.forEach((doc) => {
    if (doc.includes(user.uid)) {
      radius = doc[0].radius;
      currentUserLocation = doc[0].location;
    }
  });
  const nearbyUsersObj = userDocs.reduce((nearbyUsers, cur) => {
    if (cur[0].location.latitude || cur[0].location.longitude) {
      const distance = getDistance(currentUserLocation, cur[0].location, 100);
      const userObj = cur[0];
      if (
        isPointInCircle(cur[0].location, currentUserLocation, radius)
        // This line checks to see if the current user sits within the other users radius as well
        // && isPointInCircle(currentUserLocation, cur[0].location, cur[0].radius)
      ) {
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
