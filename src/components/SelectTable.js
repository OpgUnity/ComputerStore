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

export const tables = [{tableName: "conditions", pathName: CONDITION_PATHNAME},
    {tableName: "manufacturies", pathName: MANUFACTURERS_PATHNAME},
    {tableName: "order_states", pathName: ORDER_STATES_PATHNAME},
    {tableName: "orders", pathName: ORDERS_PATHNAME},
    {tableName: "product_category", pathName: PRODUCT_CATEGORY_PATHNAME},
    {tableName: "products", pathName: PRODUCTS_PATHNAME},
    {tableName: "sales", pathName: SALES_PATHNAME},
    {tableName: "sales_products", pathName: SALES_PRODUCTS_PATHNAME},
    {tableName: "warehouse", pathName: WAREHOUSE_PATHNAME}

]

export const PrintTable = (props) =>
    <>
        {props.table.map(function (curentTable, index) {
            return <Button variant="contained" style={{display: "block", margin: "2em"}} onClick={ () => (curentTable.pathName)}> {curentTable.tableName} </Button>
        })}
    </>