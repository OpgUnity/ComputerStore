import React from 'react';
import Row from "./Row";


const Table = ({head, body}) => {

    const header = head.map((caption, index) =>
        <th key={index}>
            {caption}
        </th>
    )

    const rows = body.map((row, index) => <Row rowData={row} key={index}/>)

    return (
        <table border='1' style={{width: '94vw', margin: "auto",}}>
            <thead>
            <tr>
                {header}
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
};

export default Table;