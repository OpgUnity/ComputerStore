import React from 'react';
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import App from "./App";
import UniversalTableComponent from "./components/SelectTable";
import {initAction} from "./actions";
import {connect} from "react-redux";
import {FormCondition} from "./pages/ConditionPage";

const Wrapper = (props) => <div>{props.children}</div>

const RouterComponent = ({initTable}) => {
    return (
        <>
            <Router history={browserHistory} onUpdate={initTable}>
                <Route path={"/"} component={Wrapper}>
                    <IndexRoute component={FormCondition}/>
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
        </>
    );
};

export default connect(null, dispatch => ({
    initTable: () => dispatch(initAction())
}))(RouterComponent);
