import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import InputReduxForm from "./InputReduxForm";
import Button from "./Button";
import {requiredValidator} from "../validators";

class LoginForm extends Component {
    render() {
        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit}>
                <Field component={InputReduxForm} validate={requiredValidator} name='user' placeholder='user'
                       label='Имя пользователя*'/>
                <Field component={InputReduxForm} validate={requiredValidator} name='password' placeholder='password'
                       type='password' label='Пароль*'/>
                <Button label='Войти'/>
            </form>
        );
    }
}

export default reduxForm({form: 'loginForm'})(LoginForm);