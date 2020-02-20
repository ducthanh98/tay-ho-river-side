import {LOGIN, LOGOUT} from "./authTypes";

const initialState = {
    isAuthenticated : true
}

const authReducer = (state = initialState,action)=>{
    switch (action.type) {
        case LOGIN: return {
            ...state,
            isAuthenticated: true
        }
        case LOGOUT: return {
            ...state,
            isAuthenticated: false
        }
        default: return state
    }
}

export  default authReducer;
