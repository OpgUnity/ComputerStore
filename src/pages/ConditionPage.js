import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Field, reduxForm} from "redux-form";
import {requiredValidator} from "../validators";
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import TextFieldReduxForm from "../components/TextFieldReduxForm";
import Grid from "@material-ui/core/Grid";
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: `${theme.spacing(5)} 0`,
            minWidth: '80%',
            display: 'block',

        },
    },

}));

const FormConditionComponent = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;

    const classes = useStyles();
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container direction="row" justify="space-between" spacing={4} alignItems='center'>
                    <Grid item xs={12}>
                        <Field name='condition_name'
                               component={TextFieldReduxForm}
                               validate={requiredValidator}
                               label="Наименование состояния"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field name='condition_description'
                               component={TextFieldReduxForm}
                               validate={requiredValidator}
                               label="Описание состояния"
                               helperText="Более подробное описание состояние товара"
                        />
                    </Grid>
                    <Grid item xs={1} alignContent='center'>
                        <button type="submit" disabled={pristine || submitting}>
                            <DoneOutlineTwoToneIcon/>
                        </button>
                    </Grid>
                    <Grid item xs={1} alignContent='center'>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>
                            <BackspaceTwoToneIcon/>
                        </button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export const FormCondition = reduxForm({
    form: 'tableForm'
})(FormConditionComponent)