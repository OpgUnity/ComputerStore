export const GET_ACTION = "GET_ACTION";
export const POST_ACTION = "POST_ACTION";
export const PUT_ACTION = "PUT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";
export const START_EIDT = "START_EIDT";
export const END_EDIT = "END_EDIT";
export const LOGIN = "LOGIN";
export const SORT_ROWS = "SORT_ROWS";
export const CHANGE_TABLE_STATE = "CHANGE_TABLE_STATE";
export const INIT_TABLE = "INIT_TABLE";

export const getAction = ({rows, fields}) => ({
    type: GET_ACTION,
    payload: {
        rows,
        fields,
    }
})

export const initAction = ()=> ({
    type: INIT_TABLE
})

export const changeTableStateAction = payload => ({
    type: CHANGE_TABLE_STATE,
    payload,
})

export const sortRowsAction = payload => ({
    type: SORT_ROWS,
    payload
});

export const postAction = payload => ({
    type: POST_ACTION,
    payload: payload
})
export const putAction = payload => ({
    type: PUT_ACTION,
    payload: payload
})
export const deleteAction = payload => ({
    type: DELETE_ACTION,
    payload: payload
})

export const startEdit = payload => ({
    type: START_EIDT,
    payload: payload
})

export const endEdit = payload => ({
    type: END_EDIT,
    payload: payload
})

export const login = payload => ({
    type: LOGIN,
    payload: payload
})