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

const getNearbyEvents = async cb => firebase.auth().onAuthStateChanged((currentUser) => {
  if (currentUser) {
    const { uid } = currentUser;
    return usersRef
      .doc(uid)
      .get()
      .then(snapshot => Promise.all([eventsRef.where('datetime', '>', Date.now()).get(), snapshot.data()]).then(
        ([querySnapshot, userObj]) => {
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
            const sortedEvents = [...nearbyEvents].sort((a, b) => a.datetime - b.datetime);
            cb(sortedEvents);
          });
        },
      ));
  }
});

const getGuestNames = async (guestIDs, cb) => {
  const guestNames = [];
  let count = 0;
  guestIDs.forEach((guest) => {
    usersRef
      .doc(guest)
      .get()
      .then((querySnapshot) => {
        guestNames.push(querySnapshot.data().name);
        count += 1;
        if (count === guestIDs.length) {
          cb(null, guestNames);
        }
      });
  });
};

const joinEvent = async (eventID, cb) => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      eventsRef
        .doc(eventID)
        .update({
          guests: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        })
        .then(() => {
          usersRef
            .doc(currentUser.uid)
            .get()
            .then((querySnapshot) => {
              cb(null, querySnapshot.data().name);
            });
        });
    }
  });
};

export {
  addEvent, getEventCoords, getNearbyEvents, eventsRef, getGuestNames, joinEvent,
};
