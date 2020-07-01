import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {handleRead, tables} from "../const";
import {Link} from "react-router";
import EnhancedTable from "./exampleTable";
import {connect} from "react-redux";
import Loader from "./Loader";


export const PrintTable = (props) =>

    <>
        {props.table.map(function (currentTable, index) {

            return (
                <Link to={currentTable.pathName}>
                    <Button variant="contained" style={{
                        display: "block",
                        margin: "2em"
                    }}> {currentTable.tableName} </Button>
                </Link>)
        })}

    </>

const UniversalTableComponent = ({columns, rows, location}) => {
    const currentTable = tables.find(tableInfo => tableInfo.pathName === location.pathname)
    const [loaded, changeLoaded] = useState(false);
    !loaded && handleRead(currentTable.pathName)
        .then(res => changeLoaded(true));
    return <>
        {
            !loaded ?
                <Loader/> :
                <EnhancedTable columnNames={columns} rows={rows}
                               tableName={currentTable.tableName}/>
        }
    </>

}

const mapStateToProps = (state) => ({
    columns: state.table.fields,
    rows: state.table.rows
})

export default connect(mapStateToProps, null)(UniversalTableComponent);