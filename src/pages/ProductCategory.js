import React from 'react';
import {connect} from "react-redux";
import {Table} from "../components/Table";
import {Button, createMuiTheme} from "@material-ui/core";
import {handleRead, PRODUCT_CATEGORY_PATHNAME} from "../const";
import {ThemeProvider} from "@material-ui/styles";
import {EnhancedTable} from "../components/exampleTable";

const ProductCategory = ({columns, rows}) =>
    <>
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: 'light',
            },
        })}>
            {rows && <EnhancedTable columnNames={columns} rows={rows}/>}
            <Button variant="contained" onClick={() => handleRead(PRODUCT_CATEGORY_PATHNAME)}>Default</Button>

        </ThemeProvider>
    </>

const mapStateToProps = (state) => ({
    columns: state.table.rowNames,
    rows: state.table.rows
})

export default connect(mapStateToProps, null)(ProductCategory);