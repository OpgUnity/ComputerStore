import React from 'react';
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import {handleRead, PRODUCTS_PATHNAME} from "../const";
import EnhancedTable from "../components/exampleTable";

const ProductCategory = ({columns, rows}) =>
    <>
        {rows && <EnhancedTable columnNames={columns} rows={rows}/>}
        <Button variant="contained" onClick={() => handleRead(PRODUCTS_PATHNAME)}>Default</Button>

    </>

const mapStateToProps = (state) => ({
    columns: state.table.rowNames,
    rows: state.table.rows
})

export default connect(mapStateToProps, null)(ProductCategory);