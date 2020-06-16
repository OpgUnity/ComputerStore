export const GET_ACTION = "GET_ACTION";
export const POST_ACTION = "POST_ACTION";
export const PUT_ACTION = "PUT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";
export const START_EIDT = "START_EIDT";
export const END_EDIT = "END_EDIT";
export const LOGIN = "LOGIN";

export const getAction = ({rows, rowNames}) => ({
    type: GET_ACTION,
    payload: {
        rows,
        rowNames,
    }
})
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