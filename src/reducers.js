import {DELETE_ACTION, END_EDIT, GET_ACTION, LOGIN, POST_ACTION, PUT_ACTION, START_EIDT} from "./actions";

const initialData ={
    rows: null,
    rowNames: null,
    edit: false,
    logged: false
};


export const tableReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_ACTION: {
            return {
                ...state,
                rows: action.payload.rows,
                rowNames: action.payload.rowNames
            }
        }
        case START_EIDT: {
            return {
                ...state,
                edit: true,
                currentRow: action.payload
            }
        }
        case END_EDIT: {
            return {
                ...state,
                edit: false,
                currentRow: null
            }
        }
        case LOGIN: {
            return {
                ...state,
                sessionKey: action.payload.sessionKey,
                logged: action.payload.sessionKey && true,
                reason: action.payload.reason? action.payload.reason: null
            }
        }
        case POST_ACTION: {
            return {
                ...state,
            }
        }
        case PUT_ACTION: {
            return {
                ...state,
            }
        }
        case DELETE_ACTION: {
            return {
                ...state,
            }
        }
        default:
            return state;
    }
}


const LOAD = 'redux-form-examples/account/LOAD';

export const loadReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            return {
                data: action.data
            }
        default:
            return state
    }
};

export const load = data => ({ type: LOAD, data });