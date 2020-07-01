import React from "react";
import {Button} from "@material-ui/core";
import {
    CONDITION_PATHNAME,
    handleRead,
    MANUFACTURERS_PATHNAME,
    ORDER_STATES_PATHNAME, ORDERS_PATHNAME,
    PRODUCT_CATEGORY_PATHNAME, PRODUCTS_PATHNAME, SALES_PATHNAME, SALES_PRODUCTS_PATHNAME,
    WAREHOUSE_PATHNAME
} from "../const";
import {ThemeProvider} from "@material-ui/styles";
import {browserHistory, IndexRoute, Link, Router} from "react-router";
import Route from "react-router/lib/Route";



export const PrintTable = (props) =>

    <>
        {props.table.map(function (curentTable, index) {

            return (
                <Link to={curentTable.pathName}>
                    <Button variant="contained" style={{
                        display: "block",
                        margin: "2em"
                    }}> {curentTable.tableName} </Button>
                </Link>)
        })}

    </>
