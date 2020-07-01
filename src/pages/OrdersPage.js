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

export const FormOrders = () => {
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
                    helperText="Цена заказа"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Дата создания"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Состояние заказа"
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue=""
                    variant="outlined"
                    helperText="Id продукта"
                />

            </div>

        </form>
    );
}


