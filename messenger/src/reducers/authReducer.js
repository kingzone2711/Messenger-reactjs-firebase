export const firebaseAuth = (state, action) => {
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return {...state,authenticating: true}

        case "USER_LOGIN_SUCCESS":
            return {...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false}
            
        case "USER_LOGIN_FAIL": 
            return {...state, 
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            } 

        case "USER_LOGOUT_REQUEST":
            break;

        case "USER_LOGOUT_SUCCESS":
            state = {
                firstName: '',
                lastName: '',
                email: '',
                authenticating: false,
                authenticated: false,
                error: null
            }
            return state;
            
        case "USER_LOGOUT_FAIL":
            state = {
                ...state,
                error: action.payload.error
            }
            break;

        default: 
            return state;    

    }
}