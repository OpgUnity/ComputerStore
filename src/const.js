import {deleteAction, getAction, login, putAction} from "./actions";

export const SERVER = 'http://localhost:3002/';
export const CONDITION_PATHNAME = 'conditions';
export const LOGIN_PATHNAME = 'login';

export const handleRead = () => {
    fetch(`${SERVER}${CONDITION_PATHNAME}`)
        .then(res => res.json())
        .then(res =>
            res.success ?
                window.store.dispatch(getAction({
                    rows: res.body.rows,
                    rowNames: res.body.rowNames,
                })) :
                Promise.reject('error due server request')
        )
        .catch(err => alert(err))
}


export const handleCreate = (item) => {
    fetch(`${SERVER}${CONDITION_PATHNAME}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(item)
        }
    )
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                window.store.dispatch(putAction(res))
                handleRead()
            } else {
                return Promise.reject('error due server request')
            }
        })
        .catch(err => alert(err))
}
export const handleUpdate = (value) => {
    fetch(`${SERVER}${CONDITION_PATHNAME}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(value)
    })
        .then(res => res.json())
        .then(res =>
            res.success ?
                handleRead() :
                Promise.reject('error due server request'))
        .catch(err => alert(err))
}
export const handleDelete = (id) => {
    fetch(`${SERVER}${CONDITION_PATHNAME}/${id}`,
        {method: 'delete'}
    )
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                window.store.dispatch(deleteAction(res))
                handleRead()
            } else {
                return Promise.reject('error due server request')
            }
        })
        .catch(err => alert(err))
}

export const handleLogin = userData => {
    fetch(`${SERVER}${LOGIN_PATHNAME}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(res =>
            window.store.dispatch(login(res.body))
        )
        .catch(err => alert(err))
}