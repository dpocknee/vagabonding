import { Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';

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

module.exports = { getUserLocation };
