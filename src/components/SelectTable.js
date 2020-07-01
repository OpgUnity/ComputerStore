import React, {useState} from "react";
import {Link as LinkButton} from "@material-ui/core";
import {handleRead, tables} from "../const";
import EnhancedTable from "./exampleTable";
import {connect} from "react-redux";
import {Link} from 'react-router'
import Loader from "./Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import {changeTableStateAction} from "../actions";

let PrintTableComponent = ({table, change, tableState}) =>
    <List>
        {table.map(function (currentTable, index) {
            return (
                <ListItem button>
                    <LinkButton to={currentTable.pathName} component={Link}>
                        <ListItemText primary={currentTable.tableName}
                                      onClick={() => change({...tableState, activeTable: currentTable})}
                        />
                    </LinkButton>
                </ListItem>)
        })}
    </List>

export const PrintTable = connect(state => ({
    tableState: state.table.tableState,
}), dispatch => ({
    change: payload => dispatch(changeTableStateAction(payload))
}))(PrintTableComponent);

const UniversalTableComponent = ({columns, rows, location}) => {
    const currentTable = tables.find(tableInfo => tableInfo.pathName === location.pathname);
    const [loaded, changeLoaded] = useState(false);
    !loaded && handleRead(currentTable.pathName)
        .then(res => changeLoaded(true));
    return <>
        <Toolbar>
            <LinkButton to='/' component={Link}>
                В главное меню
            </LinkButton>
        </Toolbar>
        {
            !loaded ?
                <Loader/> :
                <EnhancedTable columnNames={columns} rows={rows}
                               currentTable={currentTable}/>
        }

    </>

}

const mapStateToProps = (state) => ({
    columns: state.table.fields,
    rows: state.table.rows
})

export default connect(mapStateToProps, null)(UniversalTableComponent);