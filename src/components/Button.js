import React from "react";

const Button = props => {
    const styles = {
        color: props.color,
        margin: '1em',
        background: 'yellow',
        padding: '1em'
    }
    return (
        <div>
            <button style={props.style? props.style: styles} onClick={props.onClick}>
                {props.label ?
                    props.label :
                    props.children
                }
            </button>
        </div>
    )
}

export default Button