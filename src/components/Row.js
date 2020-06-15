import React, {useState} from 'react';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import {connect} from "react-redux";
import {startEdit} from "../actions";

const Row = ({rowData, edit}) => {
    const rowValues = Object.values(rowData);
    return (
        <tr>
            {
                rowValues.map((item, index) =>
                    <td key={index}>
                        {item}
                    </td>
                )
            }
            <td>
                <DeleteButton id={rowData.id}/>
            </td>
            <td>
                <EditButton onClick={() => edit(rowData)}/>
            </td>
        </tr>
    );
};

export default connect(
    null,
    dispatch => ({
        edit: (row) => dispatch(startEdit(row))
    })
)(Row);