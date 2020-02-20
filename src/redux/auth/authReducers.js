import {LOGIN, LOGOUT} from "./authTypes";
import {TOKEN} from "../../shared/constants/constant";

const initialState = {
    isAuthenticated : localStorage.getItem(TOKEN) ? true : false
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
