import React from 'react';

const InputReduxForm = ({input, meta, label, ...other}) => {
    const hasIncorrectValue = meta.touched && (meta.error || meta.warning)
    return (
        <div className='input input__box'>
            {
                label &&
                <label htmlFor={input.name}>
                    {label}
                </label>
            }
            <input {...input} type='text' className={hasIncorrectValue ? 'field__error' : ''}
                   {...other}/>

            {
                hasIncorrectValue &&
                <div className="input__error">
                    {meta.error}
                    {meta.warning}
                </div>
            }
        </div>
    );
};

export default InputReduxForm;