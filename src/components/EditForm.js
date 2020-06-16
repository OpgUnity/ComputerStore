import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "./Button";
import InputReduxForm from "./InputReduxForm";
import {load} from "../reducers";
import {connect} from "react-redux";
import {requiredValidator} from "../validators";

class EditForm extends React.Component {
    componentWillMount() {
        this.props.load(this.props.row)
    }

    render() {
        const {row} = this.props;
        const fields = [];
        for (const fieldName in row) {
            if (fieldName !== 'id')
                fields.push(
                    <Field component={InputReduxForm}
                           name={fieldName}
                           initialValue={row[fieldName]}
                           validate={requiredValidator}/>)
        }
        return (
            <form onSubmit={this.props.handleSubmit}>
                {fields}
                <Button label={'OK'}/>
            </form>
        );
    }
};

EditForm = reduxForm({
    form: 'editForm'
})(EditForm);

export default connect(
    state => ({
        initialValues: state.table.currentRow
    }),
    {load: load} // bind account loading action creator
)(EditForm)