import React from 'react';
import './App.css';
import Button from "./components/Button";
import {endEdit} from "./actions";
import {connect} from "react-redux";
import {handleCreate, handleLogin, handleRead, handleUpdate, tables} from "./const";
import AddForm from "./components/AddForm";
import LoginForm from "./components/LoginForm";
import EditForm from "./components/EditForm";
import States from "./pages/states";
import ProductCategory from "./pages/ProductCategory";
import Container from '@material-ui/core/Container';
import {PrintTable} from "./components/SelectTable";

export const App = ({rows, rowNames, edit, rowData, closeForm, logged, reason}) => {
    const handleSubmit = values => {
        closeForm();
        handleUpdate(values)
    }
    return (
        <Container maxWidth="md">
            {
                // !logged ?
                //     <>
                //         {
                //             reason === 'auth_failed' &&
                //             <span style={{color: 'red'}}>Неверное имя пользователя и/или пароль</span>
                //         }
                //         <LoginForm onSubmit={values => handleLogin(values)}/>
                //     </>
                //     :
                //     <>
                //         <Button label='Выйти' onClick={() => window.location.reload()}/>
                //         <Button onClick={handleRead} label='Открыть таблицу'/>
                //         {
                //             rows &&
                //             <>
                //                 <AddForm onSubmit={values => handleCreate(values)}/>
                //                 <States data={rows} captions={rowNames}/>
                //             </>
                //         }
                //         {edit && <EditForm row={rowData} onSubmit={handleSubmit}/>}
                //     </>

            }
            <PrintTable table={tables} />



        </Container>
    )
}


const mapStateToProps = state => ({
    rows: state.table.rows,
    rowNames: state.table.rowNames,
    edit: state.table.edit,
    rowData: state.table.currentRow,
    logged: state.table.logged,
    reason: state.table.reason
})

const mapDispatchToProps = dispatch => ({
    closeForm: () => dispatch(endEdit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);