import { Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';

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
      firebase
        .firestore()
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
    })
    .catch(console.log);
};

const getLoggedInUsers = () => {
  firebase
    .firestore()
    .collection('users')
    .where('loggedIn', '==', true)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No Matching documents');
        return [];
      }
      const userDocs = [];
      snapshot.forEach(doc => userDocs.push(doc.data()));
      return userDocs;
    })
    .catch((err) => {
      console.log(err, 'Error!!!');
    });
};

const filterUsersByDistance = () => {
  // get current user's radius
  // get current user's location
  // filter using pointInCircle from geolib
};

module.exports = { getUserLocation, getLoggedInUsers };
