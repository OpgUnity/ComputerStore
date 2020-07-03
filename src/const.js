import {deleteAction, getAction, login, putAction} from "./actions";
import {FormCondition} from "./pages/ConditionPage";
import {FormManufacturers} from "./pages/ManucacturersPage";
import {FormOrderState} from "./pages/OrderStatePage";
import {FormProductCategory} from "./pages/ProductCategoryPage";
import {FormProduct} from "./pages/ProductPage";
import {FormSales} from "./pages/SalesPage";
import {FormSalesProduct} from "./pages/SalesProductPage";
import {FormWareHouse} from "./pages/WareHousePage";


export const SERVER = 'http://195.93.151.190:3002';
export const CONDITION_PATHNAME = '/conditions';
export const LOGIN_PATHNAME = '/login';
export const PRODUCT_CATEGORY_PATHNAME='/product_category';
export const SALES_PATHNAME='/sales';
export const ORDER_STATES_PATHNAME='/order_states';
export const ORDERS_PATHNAME='/orders';
export const WAREHOUSE_PATHNAME='/warehouse';
export const PRODUCTS_PATHNAME='/products';
export const MANUFACTURERS_PATHNAME='/manufacturers';
export const SALES_PRODUCTS_PATHNAME='/sales_products';

export const tables = [
    {tableName: "Состояние товаров", pathName: CONDITION_PATHNAME, Form: FormCondition},
    {tableName: "Производители", pathName: MANUFACTURERS_PATHNAME, Form: FormManufacturers},
    {tableName: "Состояние заказа", pathName: ORDER_STATES_PATHNAME, Form: FormOrderState},
    {tableName: "Заказы", pathName: ORDERS_PATHNAME, Form: FormCondition},
    {tableName: "Категория продукта", pathName: PRODUCT_CATEGORY_PATHNAME, Form: FormProductCategory},
    {tableName: "Продукты", pathName: PRODUCTS_PATHNAME, Form: FormProduct},
    {tableName: "Продажи", pathName: SALES_PATHNAME, Form: FormSales},
    {tableName: "Проданные продукты", pathName: SALES_PRODUCTS_PATHNAME, Form: FormSalesProduct},
    {tableName: "Склад", pathName: WAREHOUSE_PATHNAME, Form: FormWareHouse},
]



export const handleRead = (pathname) =>
    fetch(`${SERVER}${pathname}`)
        .then(res => res.json())
        .then(res =>
            res.success ?
                window.store.dispatch(getAction({
                    rows: res.body.rows,
                    fields: res.body.fields,
                })) :
                Promise.reject('error due server request')
        )
        .catch(err => alert(err))


export const handleCreate = (item,pathname) =>
    fetch(`${SERVER}${pathname}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(item)
        }
    )
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                window.store.dispatch(putAction(res))
                handleRead(pathname)
            } else {
                return Promise.reject('error due server request')
            }
        })
        .catch(err => alert(err))


export const handleUpdate = (value,pathname) =>
    fetch(`${SERVER}${pathname}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(value)
    })
        .then(res => res.json())
        .then(res =>
            res.success ?
                handleRead(pathname) :
                Promise.reject('error due server request'))
        .catch(err => alert(err))

export const handleDelete = (id,pathname) =>
    fetch(`${SERVER}${pathname}/${id}`,
        {method: 'delete'}
    )
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                window.store.dispatch(deleteAction(res));
                handleRead(pathname)
            } else {
                return Promise.reject('error due server request')
            }
        })
        .catch(err => alert(err))


export const handleLogin = (userData,pathname) =>
    fetch(`${SERVER}${pathname}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(res =>
            window.store.dispatch(login(res.body))
        )
        .catch(err => alert(err))
