import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {Field} from "redux-form";

const useStyles = makeStyles(theme => ({
    fieldError: {
        borderColor: 'red',
        color: 'red',
    }
}))
const TextFieldReduxForm = ({input, className, meta, ...other}) =>
    <TextField {...input} {...other}
               error={!!(meta.touched && (meta.error || meta.warning))}
               helperText={meta.touched && `${meta.error || ''} ${meta.warning || ''}`}/>

TextFieldReduxForm.defaultProps = {
    fullWidth: true,
    variant: "outlined"
}

export default TextFieldReduxForm;