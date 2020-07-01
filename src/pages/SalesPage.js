import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(5),
            width: '50ch',
            display: 'block'

        },
    },
}));

export const FormSales = () => {
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
                    helperText="Время продажи"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    fullWidth={true}
                    variant="outlined"
                    helperText="Сумма платежа"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    fullWidth={true}
                    variant="outlined"
                    helperText="Скидка"
                />


            </div>

        </form>
    );
}


