import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/style.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./store";
import {browserHistory, IndexRoute, Router} from "react-router";
import {PrintTable, tables} from "./components/SelectTable";
import Route from "react-router/lib/Route";
import {UniversalTableComponent} from "./pages/ProductCategory";
const Div = (props) => <div> <h1>{props.location.pathName}</h1> </div>
const Wrapper = (props) => <div> {props.children} </div>
const Privet = (props) => <span> Privet </span>
window.store = store;
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={"/"} component={Wrapper}>
                <IndexRoute component={App}/>
                <Route path={"/div"} component={Div}/>
                <Route path={"/conditions"} component={UniversalTableComponent}/>
                <Route path={"/manufacturers"} component={UniversalTableComponent}/>
                <Route path={"/order_states"} component={UniversalTableComponent}/>
                <Route path={"/orders"} component={UniversalTableComponent}/>
                <Route path={"/product_category"} component={UniversalTableComponent}/>
                <Route path={"/products"} component={UniversalTableComponent}/>
                <Route path={"/sales"} component={UniversalTableComponent}/>
                <Route path={"/sales_products"} component={UniversalTableComponent}/>
                <Route path={"/warehouse"} component={UniversalTableComponent}/>
            </Route>
        </Router>
    </Provider>,

    document.getElementById('root')
);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();