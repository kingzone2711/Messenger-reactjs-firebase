import firebase from 'firebase/app'
require('firebase/auth')
export const signup=(user)=> {
  return async (dispatch)=>{
      //const db=firebase.firestore();
      firebase.auth()
      .createUserWithEmailAndPassword(user.email,user.password)
      .then(user=>{
          console.log(user)
      }).catch(error=>{
            console.log(error)
          }
      )
  }
}
