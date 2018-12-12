import * as firebase from 'firebase';
import 'firebase/firestore';

const { firestore } = require('../config');

const userID = '1234';
const userName = 'Aaron';
const clickedUserID = '5678';
const chatsRef = firestore.collection('chats');

const getPreviousMessages = async (currentUser, clickedUser) => {
  // query the database looking for previous messages between the users.
  const queryPreviousChatHistory = chatsRef.where(
    'users',
    'array-contains',
    `${currentUser}${clickedUser}`,
  );
  return queryPreviousChatHistory
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        chatsRef.doc(`${currentUser}${clickedUser}`).set({
          users: [`${currentUser}${clickedUser}`, `${clickedUser}${currentUser}`],
          messages: [],
        });
        return { doc: `${currentUser}${clickedUser}`, messages: [] };
      }
      const previousMessages = [];
      let docID;
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        previousMessages.push(doc.data().messages);
      });
      return { doc: docID, messages: previousMessages[0].splice(-20).reverse() };
    })
    .catch((err) => {
      console.log(err, '<<<<<Get Previous Messages');
    });
};

const sendMessage = async (message, doc) => {
  const chatRefDoc = chatsRef.doc(doc);
  const newMessage = { ...message };
  newMessage.createdAt = `${newMessage.createdAt}`;

  return chatRefDoc
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(newMessage),
    })
    .then(() => newMessage)
    .catch((err) => {
      console.log(err, '<<<<<updateMessagesErr');
    });
};

module.exports = {
  userID,
  clickedUserID,
  getPreviousMessages,
  userName,
  sendMessage,
  chatsRef,
};
