export const firebaseUser =(state, action) => {

    switch(action.type){
        case "GET_REALTIME_USERS_REQUEST":
            break;
        case "GET_REALTIME_USERS_REQUEST_SUCCESS":
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case "GET_REALTIME_MESSAGES":
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
        case "GET_REALTIME_MESSAGES_FAIL":
            state = {
                ...state,
                conversations: []
            }
            break;
        
    }


    return state;

}