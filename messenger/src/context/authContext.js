import React from "react";
//firebaseauth reducer
import { firebaseAuth } from "../reducers/authReducer";


export const Auth = React.createContext();
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}

export const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(firebaseAuth, initialState);
    const value = {state, dispatch};

    return <Auth.Provider value={value}>
                {props.children}
           </Auth.Provider>

}
