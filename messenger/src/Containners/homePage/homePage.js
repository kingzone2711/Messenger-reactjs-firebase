import React, { useEffect,useState } from 'react'
import Layout from '../../Components/layout/layout';
 import { User } from "../../context/userContext";
import { Auth } from "../../context/authContext"; 
import {getRealtimeConversations} from '../../actions/userActions'
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "./style.css"



const Users = (props) => {
  const {user} = props;
  return (
    <div  className="displayName">
                  <div className="displayPic">
                      <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                  </div>
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                      <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                      <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
                  </div>
              </div>
  );
}
function HomePage() {
  // const [chatStarted, setChatStarted] = useState(false);
  // const [chatUser, setChatUser] = useState('');
  // const [message, setMessage] = useState('');
  // const [userUid, setUserUid] = useState(null);
  let unsubscribe;
  const { stateUser, dispatchUser } = React.useContext(User);
  const { state, dispatch } = React.useContext(Auth);
  console.log(stateUser)
  const getRealtimeUsers = (uid) => {
       
        const db = firebase.firestore();
        const unsubscribe = db.collection("users")
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function(doc) {
                if(doc.data().uid != uid){
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
                    key={user.uid}
                    user={user}
                  />
                );
              }) : null
          }
        </div>
      </section>
   </Layout>
  )
}
export default HomePage