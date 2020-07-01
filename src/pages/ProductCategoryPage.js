import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(5),
            width: '25ch',
            display: 'block'

        },
    },
}));

export const FormProductCategory = () => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Название категории"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Описание категории"
                />


            </div>

        </form>
    );
}


