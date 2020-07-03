import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/style.scss'
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import store from "./store";
import {tables} from "./components/SelectTable";
import Router from "./Router";

window.store = store;
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={createMuiTheme()}>
            <Router/>
        </ThemeProvider>
    </Provider>,

    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();