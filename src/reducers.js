import {
    CHANGE_TABLE_STATE,
    DELETE_ACTION,
    END_EDIT,
    GET_ACTION, INIT_TABLE,
    LOGIN,
    POST_ACTION,
    PUT_ACTION,
    SORT_ROWS,
    START_EIDT
} from "./actions";

const initialData ={
    tableState: {
        order: null,
        rowsPerPageOptions: [5, 10, 25],
        orderBy: 'asc',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        dense: false
    },
    rows: [],
    rowNames: [],
    edit: false,
    logged: false
};

export const tableReducer = (state = initialData, action) => {
    switch (action.type) {
        case INIT_TABLE: {
            return {
                ...initialData
            }
        }
        case SORT_ROWS: {
            return {
                ...state,
                rows: action.payload
            }
        }
        case CHANGE_TABLE_STATE: {
            return {
                ...state,
                tableState: action.payload
            }
        }
        case GET_ACTION: {
            return {
                ...state,
                rows: action.payload.rows,
                fields: action.payload.fields
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