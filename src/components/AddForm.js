import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import InputReduxForm from "./InputReduxForm";
import Button from "./Button";
import {requiredValidator} from "../validators";


class AddForm extends Component {
    render() {
        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field component={InputReduxForm}
                       name='condition_name'
                       validate={requiredValidator}
                       label='Наименование состояния'
                />
                <Field component={InputReduxForm}
                       name='condition_description'
                       label='Описание состояния'
                />
                <Button label='Закинуть в таблицу'/>
            </form>
        );
    }
}

export default reduxForm({
        form: 'addForm',
    initialValues:{
            condition_description: ''
    }
    }
)(AddForm);