import React, { useEffect, useState } from 'react'
import Layout from '../../Components/layout/layout';
import { User } from "../../context/userContext";
import { Auth } from "../../context/authContext";
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "./style.css"



const Users = (props) => {
  const { user, onClick } = props;
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px' }}>
        <span style={{ fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
        <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
      </div>
    </div>
  );
}
function HomePage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  const { stateUser, dispatchUser } = React.useContext(User);
  const { state, dispatch } = React.useContext(Auth);
  let unsubscribe;

  console.log(stateUser)
  async function getRealtimeUsers (uid) {

    const db = firebase.firestore();
    const unsubscribe = await db.collection("users")
      //.where("uid", "!=", uid)
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach(function (doc) {
          if (doc.data().uid != uid) {
            users.push(doc.data());
          }
        });
        dispatchUser({
          type: "GET_REALTIME_USERS_REQUEST_SUCCESS",
          payload: { users }
        });

      });

    return unsubscribe;

  }
  async function getRealtimeConversations (user)  {
    const db = firebase.firestore();
    await db.collection('conversations')
      .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {

        const conversations = [];

        querySnapshot.forEach(doc => {

          if (
            (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
            ||
            (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
          ) {
            conversations.push(doc.data())
          }
        });

        dispatchUser({
          type: "GET_REALTIME_MESSAGES",
          payload: { conversations }
        })
      })
  }
 async function updateMessage (msgObj){
      const db = firebase.firestore();
     await db.collection('conversations')
        .add({
          ...msgObj,
          isView: false,
          createdAt: new Date()
        })
        .then((data) => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        });

    }
  
  const initChat = (user) => {
    console.log(user)
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid);
    getRealtimeConversations({ uid_1: state.uid, uid_2: user.uid })
  }
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: state.uid,
      user_uid_2: userUid,
      message
    }
    if(message !== ""){
      updateMessage(msgObj)
    }
  }
  useEffect(() => {
    return getRealtimeUsers(state.uid)
  }, []);



  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {
            stateUser.users.length > 0 ?
              stateUser.users.map(user => {
                return (
                  <Users
                    onClick={initChat}
                    key={user.uid}
                    user={user}
                  />
                );
              }) : null
          }
        </div>

        <div className="chatArea">
          <div className="chatHeader">
            {
              chatStarted ? chatUser : ''
            }
          </div>
          <div className="messageSections">
            {
              chatStarted ?
                stateUser.conversations.map((con, index) =>

                  <p key={index} className="messageStyle" >{con.message}</p>
                )
                : null
            }
          </div>
          {
            chatStarted ?
              <div className="chatControls">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Message"
                />
                <button onClick={submitMessage}>Send</button>
              </div> : null
          }

        </div>
      </section>
    </Layout>
  )
}
export default HomePage