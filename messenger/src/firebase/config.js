import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCoecyG3exjYiR1oydVb9WXTUd1Bj9EAiA",
    authDomain: "realtime-project-42296.firebaseapp.com",
    databaseURL: "https://realtime-project-42296-default-rtdb.firebaseio.com",
    projectId: "realtime-project-42296",
    storageBucket: "realtime-project-42296.appspot.com",
    messagingSenderId: "558203955038",
    appId: "1:558203955038:web:5710c060517b5af42891cf",
    measurementId: "G-SC36V8LPYT"
};
class Firebase {

    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();
    }

    async login(email, pasword) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, pasword);
        return user;
    }

    async signup(user) {
        const posts = await firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
        return posts;
    }

    async logout() {
        const logout = await firebase.auth().signOut();
        return logout;
    }

    async setCollectionUsers(data, user) {
        const posts = await firebase.firestore().collection("users").doc(data.user.uid)
            .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true
            });
        return posts;
    }
    async setCollectionUsersIsonline(data) {
        const name = data.user.displayName.split(" ");
        const firstName = name[0];
        const lastName = name[1];
        const posts = await firebase.firestore().collection("users")
            .doc(data.user.uid)
            .update({
                firstName: firstName,
                lastName: lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true
            })
        return posts;
    }
    
     currentuser(){
        return firebase.auth();
    }
}
export default new Firebase()