import React from 'react';
import PropTypes from 'prop-types';
import {lighten, makeStyles} from '@material-ui/core/styles';
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {changeTableStateAction, sortRowsAction} from "../actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {EditTwoTone} from "@material-ui/icons";
import {handleDelete} from "../const";

/**
 * Сортирует массив строк
 * @param arr
 * @param property
 * @param mode
 * @returns {this}
 */
const sortArr = (arr = [], property, mode = 'ASC') =>
    arr.length &&
    typeof arr[0][property] === 'string' ? (
        mode.toLowerCase() === 'asc' ?
            [...arr].sort((cur, next) => `${cur[property]}`.localeCompare(next[property])) :
            [...arr].sort((cur, next) => `${next[property]}`.localeCompare(cur[property]))
    ) : (
        typeof arr[0][property] === 'number' ? (
            mode.toLowerCase() === 'asc' ?
                [...arr].sort((cur, next) => cur[property] - next[property]) :
                [...arr].sort((cur, next) => next[property] - cur[property])
        ) : new Error('incorrect argument type')
    )


const TableCaption = ({tableName}) =>
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
        <Grid item/>
        <Grid item> <Typography variant="h6" id="tableTitle" component="div" align={"center"}>
            {tableName}
        </Typography>
        </Grid>
    </Grid>

const BottomPagination = ({tableState, change, ...other}) =>
    <TablePagination onChangePage={(e, page) => change({...tableState, page})}
                     onChangeRowsPerPage={e => change({
                         ...tableState,
                         page: 0,
                         rowsPerPage: parseInt(e.target.value, 10),
                     })}
                     component="div"
                     {...other}
    />

const TableHeader = ({classes, selectAll, order, orderBy, numSelected, rowCount, sort, columnNames}) =>
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount}
                          checked={rowCount && numSelected === rowCount}
                          onChange={selectAll}
                />
            </TableCell>
            {
                columnNames.map(columnName =>
                    <TableCell key={columnName}
                               align={'right'}
                               padding={'default'}
                               sortDirection={order === columnName ? orderBy : false}
                               onClick={() => {
                                   sort(columnName, orderBy.toLowerCase() === 'asc' ? 'desc' : 'asc')
                               }}>
                        <TableSortLabel active={order === columnName}
                                        direction={order === columnName ? orderBy : 'asc'}>
                            {columnName}
                        </TableSortLabel>
                    </TableCell>
                )
            }
        </TableRow>
    </TableHead>

TableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    sort: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    orderBy: PropTypes.oneOf(['asc', 'desc']).isRequired,
    order: PropTypes.string,
    rowCount: PropTypes.number.isRequired,
};

//настройка стилей верхнего тулбара
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light' ?
            {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            } : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = ({numSelected, classes, handleDelete}) =>
    <Toolbar>
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected ? `${numSelected} Выбрано` : null}
        </Typography>
        {numSelected === 1 &&
        <Tooltip title="Редактировать выбраннный элемент">
            <IconButton aria-label="delete" onClick={() => alert('deleted')}>
                <EditTwoTone/>
            </IconButton>
        </Tooltip>}
        {
            numSelected ?
                <Tooltip title="Удалить выбранные элементы">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                : null}
    </Toolbar>


EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

/**
 *
 * @param columnNames
 * @param rows
 * @param order
 * @param sort
 * @param change
 * @returns {*}
 * @constructor
 */
const EnhancedTable = ({columnNames, rows, tableState, sort, change, currentTable}) => {
    const {order, orderBy, selected, page, rowsPerPage, dense, rowsPerPageOptions} = tableState;
    const classes = useStyles();

    const sortRows = (rows, property, mode) => {
        sort(rows, property, mode);
        change({...tableState, order: property, orderBy: mode})
    }

    const selectAll = () => {
        selected.length !== rows.length ?
            change({...tableState, selected: rows}) :
            change({...tableState, selected: []})
    };

    const selectRow = row => {
        selected.find(sel => Object.entries(sel).toString() === Object.entries(row).toString()) ?
            change({...tableState, selected: selected.filter(sel => sel !== row)}) :
            change({...tableState, selected: [...selected, row]})
    }

    const isSelected = row =>
        !!selected.find(sel =>
            Object.entries(sel).toString() === Object.entries(row).toString()
        );

    const deleteRows = (selectedRows) =>
        selectedRows.length && selectedRows.forEach(item => {
            handleDelete(Object.values(item)[0], currentTable.pathName);
            change({...tableState, selected: [],})
        })

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableCaption tableName={currentTable.tableName}/>
                <EnhancedTableToolbar numSelected={selected.length}
                                      classes={useToolbarStyles()}
                                      handleDelete={deleteRows.bind(null, selected)}
                />
                <TableContainer>
                    <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <TableHeader
                            columnNames={columnNames}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            selectAll={selectAll}
                            sort={sortRows.bind(null, rows)}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) =>
                                    <TableRow hover
                                              onClick={selectRow.bind(null, row)}
                                              role="checkbox"
                                              aria-checked={isSelected(row)}
                                              tabIndex={-1}
                                              key={index}
                                              selected={isSelected(row)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected(row)}
                                                      inputProps={{'aria-labelledby': `enhanced-table-checkbox-${index}`}}
                                            />
                                        </TableCell>
                                        {
                                            columnNames.map(columnName =>
                                                <TableCell align="right" key={columnName}>
                                                    {row[columnName]}
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <BottomPagination tableState={tableState}
                                  change={change}
                                  count={rows.length}
                                  page={page}
                                  rowsPerPage={rowsPerPage}
                                  rowsPerPageOptions={rowsPerPageOptions}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={() => change({...tableState, dense: !dense})}/>}
                label="Сокращённый вариант таблицы"
            />
        </div>
    );
};

const mapStateToProps = state => ({
    rows: state.table.rows,
    tableState: state.table.tableState
});

const mapDispatchToProps = dispatch => ({
    sort: (array, property, mode) => dispatch(sortRowsAction(sortArr(array, property, mode))),
    change: (newState) => dispatch(changeTableStateAction(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);

