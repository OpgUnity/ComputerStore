import React from 'react';
import Table from "../components/Table";

const States = ({data, captions}) => {
    return (
        <div style={{textAlign: "center"}}>
            <span style={{fontSize: '2em'}}>Состояния товаров</span>
            <Table body={data} head={captions}/>
        </div>
    );
};

export default States;