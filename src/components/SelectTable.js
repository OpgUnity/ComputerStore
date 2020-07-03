import React, {useState} from "react";
import {Link as LinkButton} from "@material-ui/core";
import {handleCreate, handleRead, tables} from "../const";
import EnhancedTable from "./exampleTable";
import {connect} from "react-redux";
import {Link} from 'react-router'
import Loader from "./Loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import {changeTableStateAction} from "../actions";
import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import MenuOpenTwoToneIcon from '@material-ui/icons/MenuOpenTwoTone';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/styles";

let PrintTableComponent = ({table, change, tableState}) =>
    <List>
        {table.map(function (currentTable, index) {
            return (
                <LinkButton to={currentTable.pathName} component={Link}>
                    <ListItem button>
                        <ListItemIcon>
                            <TableChartTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText primary={currentTable.tableName}/>
                    </ListItem>
                </LinkButton>
            )
        })}
    </List>

export const PrintTable = connect(state => ({
    tableState: state.table.tableState,
}), dispatch => ({
    change: payload => dispatch(changeTableStateAction(payload))
}))(PrintTableComponent);


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        overflowY: 'auto',
        width: '80vw',
        maxHeight: '80vh',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const UniversalTableComponent = ({columns, rows, location}) => {
    const classes = useStyles();
    const currentTable = tables.find(tableInfo => tableInfo.pathName === location.pathname);
    const {Form} = currentTable;
    const [loaded, changeLoaded] = useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    !loaded && handleRead(currentTable.pathName)
        .then(res => changeLoaded(true));

    const create = val => {
        handleCreate(Object.values(val), currentTable.pathName)
        setOpenCreate(false);
    }
    return <>
        <Toolbar>
            <LinkButton to='/' component={Link}>
                <MenuOpenTwoToneIcon/>
            </LinkButton>
        </Toolbar>
        {
            !loaded ?
                <Loader/> :
                <EnhancedTable columnNames={columns} rows={rows}
                               currentTable={currentTable}
                               handleEdit={setOpenEdit.bind(null, true)}
                               handleCreate={setOpenCreate.bind(null, true)}/>
        }

        <Modal open={openCreate} onClose={setOpenCreate.bind(null, false)}>
            <div className={classes.paper}>
                <Form onSubmit={create}/>
            </div>
        </Modal>

    </>

}

const mapStateToProps = (state) => ({
    columns: state.table.fields,
    rows: state.table.rows
})

export default connect(mapStateToProps, null)(UniversalTableComponent);