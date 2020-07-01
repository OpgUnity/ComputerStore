import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(5),
            width: '50ch',
            display: 'block',

        },
    },
}));

export const FormCondition = () => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    fullWidth={true}
                    variant="outlined"
                    helperText="Наименование состояния"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Описание состояния"
                />
            </div>

        </form>
    );
}


