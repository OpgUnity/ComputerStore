import React from 'react';
import Button from "./Button";
import {handleDelete} from "../const";

const DeleteButton = ({id}) => {

    const del = () => handleDelete(id);
    return (
            <Button onClick={del} label='-' style={{
                background: 'transparent',
                border: '1px solid #f00',
                borderRadius: '2em',
                color: '#f00',
                display: 'inline-block',
                fontSize: '2em',
                height: '1em',
                width: '1em',
                lineHeight: '2px',
                paddingBottom: '.2em',
                textAlign: 'center'
            }}/>
    );
};

export default DeleteButton;