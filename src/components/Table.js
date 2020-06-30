import {
    Table as TableComponent,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";
import React from "react";
import {Row} from "./Row";

export const Table = ({columns, rows}) =>
    <TableContainer component={Paper}>
        <TableComponent aria-label="simple table">
            <TableHead>
                <TableRow>
                    {columns && columns.map(columnName =>
                        <TableCell key={columnName} align="center">{columnName}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows && rows.map((rowValue) =>
                    <Row key={rowValue[columns[0]]} columns={columns} rowValue={rowValue}/>
                )}
            </TableBody>
        </TableComponent>
    </TableContainer>