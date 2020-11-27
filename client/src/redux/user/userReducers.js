import {SET_CREDENTIALS, SET_TOKEN} from './userActionsTypes'

const initialState = {
    token: '',
    credentials : {
        firstname : '',
        name: ''
    }
}

export const token = (state = initialState.token , action )=>{
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token : action.payload
            }
 
        default:
            return initialState.token
    }
}

export const setCredential =( state=initialState.credentials , action) => {
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                ...state,
                firstname : action.payload.firstname ,
                name : action.payload.name
            }
            
    
        default:
            return initialState.credentials
    }
}