import * as firebase from 'firebase';
import 'firebase/firestore';

const { firestore } = require('../config');

const userID = '1234';
const clickedUserID = '5678';
const chatsRef = firestore.collection('chats');

const getPreviousMessages = async (currentUser, clickedUser) => {
  // query the database looking for previous messages between the users.
  const queryPreviousChatHistory = chatsRef.where(
    'users',
    'array-contains',
    `${currentUser}${clickedUser}`,
  );
  queryPreviousChatHistory.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
  // return this if it exists, otherwise return empty array
};

module.exports = {
  userID,
  clickedUserID,
  getPreviousMessages,
};
