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

/**
 * Сортирует массив строк
 * @param arr
 * @param property
 * @param mode
 * @returns {this}
 */
const sortArrOfStrings = (arr = [], property, mode = 'ASC') =>
    mode.toLowerCase() === 'asc' ?
        [...arr].sort((cur, next) => `${cur[property]}`.localeCompare(next[property])) :
        [...arr].sort((cur, next) => `${next[property]}`.localeCompare(cur[property]))


function EnhancedTableHead({classes, selectAll, order, orderBy, numSelected, rowCount, sort, columnNames}) {

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount && numSelected === rowCount}
                        onChange={selectAll}
                    />
                </TableCell>

                {
                    columnNames.map(columnName =>
                        <TableCell
                            onClick={() => {
                                sort(columnName, orderBy.toLowerCase() === 'asc' ? 'desc' : 'asc')
                            }}
                            key={columnName}
                            align={'right'}
                            padding={'default'}
                            sortDirection={order === columnName ? orderBy : false}
                        >
                            <TableSortLabel
                                active={order===columnName}
                                direction={order === columnName ? orderBy : 'asc'}>
                                {columnName}
                                {
                                    orderBy === columnName ?
                                        <span className={classes.visuallyHidden}/>
                                        : null
                                }
                            </TableSortLabel>
                        </TableCell>
                    )
                }
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
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

        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Здесь название таблицы
        </Typography>
        {
            numSelected ?
                <Tooltip title="Удалить выбранные элементы">
                    <IconButton aria-label="delete" onClick={() => alert('deleted')}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                : null
        }
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
const EnhancedTable = ({columnNames, rows, tableState, sort, change}) => {
    const {order, orderBy, selected, page, rowsPerPage, dense} = tableState;
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

    const isSelected = row => !!selected.find(sel => Object.entries(sel).toString() === Object.entries(row).toString());

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container
                      direction="column"
                      justify="space-around"
                      alignItems="center"
                      spacing={5}>
                    <Grid item/>
                    <Grid item> <Typography variant="h6" id="tableTitle" component="div" align={"center"}>
                        Здесь название таблицы
                    </Typography>
                    </Grid>

                </Grid>
                <EnhancedTableToolbar numSelected={selected.length} classes={useToolbarStyles()}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
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
                            {

                                rows.map((row, index) =>
                                    <TableRow
                                        hover
                                        onClick={selectRow.bind(null, row)}
                                        role="checkbox"
                                        aria-checked={isSelected(row)}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isSelected(row)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected(row)}
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
                <TablePagination
                    onChangePage={()=>{}}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense}/>}
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
    sort: (array, property, mode) => dispatch(sortRowsAction(sortArrOfStrings(array, property, mode))),
    change: (newState) => dispatch(changeTableStateAction(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);

