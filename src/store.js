import {applyMiddleware, combineReducers, createStore} from "redux";
import {loadReducer, tableReducer} from "./reducers";
import {logger} from "redux-logger";
import {reducer as formReducer} from 'redux-form'

const store = createStore(
    combineReducers({
            table: tableReducer,
            ...loadReducer,
            form: formReducer
        },
    ),
    applyMiddleware(logger)
)

export default store