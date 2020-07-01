import React from 'react';
import './App.css';
import {endEdit} from "./actions";
import {connect} from "react-redux";
import {tables} from "./const";
import Container from '@material-ui/core/Container';
import {PrintTable} from "./components/SelectTable";

export const App = ({rows, rowNames, edit, rowData, closeForm, logged, reason}) => {
    return (
        <Container maxWidth="md">
            <PrintTable table={tables}/>
        </Container>
    )
}


const mapStateToProps = state => ({
    rows: state.table.rows,
    rowNames: state.table.rowNames,
    edit: state.table.edit,
    rowData: state.table.currentRow,
    logged: state.table.logged,
    reason: state.table.reason
})

const mapDispatchToProps = dispatch => ({
    closeForm: () => dispatch(endEdit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);