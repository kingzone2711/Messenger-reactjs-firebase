import React from "react";
//firebaseauth reducer
import { firebaseUser } from "../reducers/userReducer";


export const User = React.createContext();
const initialState = {
    users: [],
    conversations: []
}

export const UserProvider = (props) => {

    const [stateUser, dispatchUser] = React.useReducer(firebaseUser, initialState);
    const value = {stateUser, dispatchUser};

    return <User.Provider value={value}>
                {props.children}
           </User.Provider>

}
