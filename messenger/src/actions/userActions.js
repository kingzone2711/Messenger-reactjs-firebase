import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";


export const getRealtimeConversations = () => {
   
    const conversations = [];
        const db = firebase.firestore();
        db.collection('conversations')
        .where('user_uid_1', 'in', ['gvdOflktJlV8JcZgGHUGy2MsMoA3','Te1z2u0QQjcqyNR5mgPMISI9zi13'])
        .orderBy('createdAt', 'asc')
        .onSnapshot((querySnapshot) => {

        
            console.log(querySnapshot)
            querySnapshot.forEach(doc => {

                if(
                    (doc.data().user_uid_1 === 'gvdOflktJlV8JcZgGHUGy2MsMoA3' && doc.data().user_uid_2 ==='Te1z2u0QQjcqyNR5mgPMISI9zi13')
                    || 
                    (doc.data().user_uid_1 === 'Te1z2u0QQjcqyNR5mgPMISI9zi13' && doc.data().user_uid_2 === 'gvdOflktJlV8JcZgGHUGy2MsMoA3')
                ){
                    conversations.push(doc.data())
                }            
            });


         
        })
        //user_uid_1 == 'myid' and user_uid_2 = 'yourId' OR user_uid_1 = 'yourId' and user_uid_2 = 'myId'

        return conversations;
       
}