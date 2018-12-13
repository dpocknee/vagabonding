import * as firebase from 'firebase';
import 'firebase/firestore';

const { firestore } = require('../config');

const userID = '1234';
const userName = 'Aaron';
const clickedUserID = '5678';
const chatsRef = firestore.collection('chats');
const usersRef = firestore.collection('users');

const getPreviousMessages = async (currentUser, clickedUser) => {
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
          users: [
            `${currentUser}${clickedUser}`,
            `${clickedUser}${currentUser}`,
          ],
          messages: [],
          usersArr: [`${currentUser}`, `${clickedUser}`],
        });
        return { doc: `${currentUser}${clickedUser}`, messages: [] };
      }
      const previousMessages = [];
      let docID;
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        previousMessages.push(doc.data().messages);
      });
      return {
        doc: docID,
        messages: previousMessages[0].splice(-20).reverse(),
      };
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

// To put a listeners on the chats collection, use .onSnapshot in the place of .get():
// allUserChats.onSnapshot(querySnapshot => {
//   querySnapshot.docChanges().forEach(change => {
//     if (change.type === "added") {
//       console.log(change.doc.data());
//     }
//   });
// });
/** *************** */
const getChats = async (user) => {
  const allUserChats = chatsRef.where('usersArr', 'array-contains', `${user}`);
  return allUserChats.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      return [];
    }
    const chats = [];
    querySnapshot.forEach((conversationDoc) => {
      const chatObj = {};
      conversationDoc.data().usersArr[0] === userID
        ? (chatObj.otherUser = conversationDoc.data().usersArr[1])
        : (chatObj.otherUser = conversationDoc.data().usersArr[0]);
      chatObj.messages = conversationDoc.data().messages;
      chats.push(chatObj);
    });
    return chats;
  });
};

const getChatPartnerNames = async otherUserID => usersRef
  .doc(otherUserID)
  .get()
  .then((querySnapshot) => {
    const chatPartnerInfo = {};
    chatPartnerInfo.username = querySnapshot.data().username;
    chatPartnerInfo.name = querySnapshot.data().name;
    return chatPartnerInfo;
  });

module.exports = {
  userID,
  clickedUserID,
  getPreviousMessages,
  userName,
  sendMessage,
  chatsRef,
  getChats,
  getChatPartnerNames,
};
