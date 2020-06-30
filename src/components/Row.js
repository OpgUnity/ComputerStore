import React from "react";
import {TableRow, TableCell} from "@material-ui/core";

export const Row = ({columns, rowValue}) =>
    <TableRow>
        {
            columns.map(columnName =>
                <TableCell align="center" key={columnName}>
                    {rowValue[columnName]}
                </TableCell>
            )
        }
    </TableRow>