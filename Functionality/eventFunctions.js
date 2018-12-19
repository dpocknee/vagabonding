import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Expo from 'expo';
import { isPointInCircle } from 'geolib';

const { firestore } = require('../config');

const eventsRef = firestore.collection('events');
const usersRef = firestore.collection('users');

// Function takes an object of event info
// Creates a new object formatted for firestore storage
// Set new object in events collection

const getEventCoords = async locationString => Expo.Location.geocodeAsync(locationString);

const addEvent = async (eventObj) => {
  const {
    eventLocation, eventName, eventDescription, datetime, currentUserUID,
  } = eventObj;
  return getEventCoords(eventLocation).then((locationObj) => {
    const { latitude, longitude } = locationObj[0];
    const newEvent = {
      location: { latitude, longitude },
      eventName,
      eventDescription,
      eventLocation,
      datetime,
      guests: [currentUserUID],
    };
    return eventsRef.doc().set(newEvent);
  });
};

const getNearbyEvents = async () => firebase.auth().onAuthStateChanged((currentUser) => {
  const { uid } = currentUser;
  return usersRef
    .doc(uid)
    .get()
    .then(snapshot => Promise.all([eventsRef.get(), snapshot.data()]).then(([querySnapshot, userObj]) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, info: doc.data() });
      });
      const { location, radius } = userObj;
      return Promise.all([
        eventsData.filter((eventObj) => {
          if (isPointInCircle(eventObj.info.location, location, radius)) {
            return eventObj;
          }
        }),
      ]).then(([nearbyEvents]) => {
        console.log(nearbyEvents);
      });
    }));
});
// get all events
// filter events - check if event.location = isPointinCircle
// return filtered events (promise)

export { addEvent, getEventCoords, getNearbyEvents };
