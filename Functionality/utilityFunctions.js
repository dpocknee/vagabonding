import { Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { isPointInCircle, getDistance } from 'geolib';

const { firestore } = require('../config');

const getUserLocation = async (user, cb) => {
  // console.log(user, 'inside utils');
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
  await Location.getCurrentPositionAsync({})
    .then((location) => {
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
        })
        .catch((err) => {
          console.log(err, '<<<<Update Users Location');
        });
    })
    .catch(console.log);
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
  })
  .catch((err) => {
    console.log(err, '<<<<Get Logged In Users');
  });

const filterUsersByDistance = async (user, cb) => {
  const userDocs = await getLoggedInUsers();
  if (!userDocs.length) {
    console.log('No users nearby');
  } else {
    let radius;
    let currentUserLocation;
    userDocs.forEach((doc) => {
      if (doc.includes(user.uid)) {
        radius = doc[0].radius;
        currentUserLocation = doc[0].location;
      }
    });
    const nearbyUsers = userDocs.map((userDoc) => {
      if (isPointInCircle(userDoc[0].location, currentUserLocation, radius)) {
        const distance = getDistance(currentUserLocation, userDoc[0].location, 100);
        return [userDoc, distance];
      }
    });
    console.log(nearbyUsers);
    cb(null, nearbyUsers);
  }
  // check if users array is empty
  // get current user's radius
  // get current user's location
  // filter using pointInCircle from geolib
};

module.exports = { getUserLocation, getLoggedInUsers, filterUsersByDistance };
