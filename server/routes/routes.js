'use strict';

//Тут прописаны все маршруты и методы, по которым их можно достичь
//Все маршруты строятся так
//  http://localhost:тут порт/а тут маршруты
module.exports = function (app) {

    let conditionsController = require('../controllers/conditionsController');
    let salesController = require('../controllers/salesController');
    let salesProductsController = require('../controllers/salesProductsController');
    let productsController = require('../controllers/productsController');
    let manufacturersController = require('../controllers/manufacturersController');
    let productCategoryController = require('../controllers/productCategoryController');
    let order_statesController = require('../controllers/order_statesController');
    let ordersController = require('../controllers/ordersController');
    let warehouseController = require('../controllers/warehouseController');

    app.route('/login')
        .post(conditionsController.login);

    //Например для этого с методом GET
    // http://localhost:3002/conditions
    app.route('/conditions')
        .get(conditionsController.get)
        .put(conditionsController.put)
        .post(conditionsController.update);

    app.route('/sales')
        .get(salesController.get)
        .put(salesController.put)
        .post(salesController.update);

    app.route('/product_category')
        .get(productCategoryController.get)
        .put(productCategoryController.put)
        .post(productCategoryController.update);

    app.route('/conditions/:id')
        .delete(conditionsController.delete);

    app.route('/orders')
        .get(ordersController.get)
        .put(ordersController.put)
        .post(ordersController.update);

    app.route('/warehouse')
        .get(warehouseController.get)
        .put(warehouseController.put)
        .post(warehouseController.update);

    app.route('/product_category')
        .get(productCategoryController.get)
        .put(productCategoryController.put)
        .post(productCategoryController.update);

    app.route('/products')
        .get(productsController.get)
        .put(productsController.put)
        .post(productsController.update);

    app.route('/manufacturers')
        .get(manufacturersController.get)
        .put(manufacturersController.put)
        .post(manufacturersController.update);

    app.route('/order_states')
        .get(order_statesController.get)
        .put(order_statesController.put)
        .post(order_statesController.update);

    app.route('/orders')
        .get(ordersController.get)
        .put(ordersController.put)
        .post(ordersController.update);

    app.route('/warehouse')
        .get(warehouseController.get)
        .put(warehouseController.put)
        .post(warehouseController.update);

    app.route('/sales/:id')
        .delete(salesController.delete);

    app.route('/product_category/:id')
        .delete(productCategoryController.delete);

    app.route('/products/:id')
        .delete(productsController.delete);

    app.route('/sales_products/:id')
        .delete(salesProductsController.delete)

    app.route('/order_states/:id')
        .delete(order_statesController.delete)

    app.route('/orders/:id')
        .delete(ordersController.delete)

    app.route('/warehouse/:id')
        .delete(warehouseController.delete)

        .delete(salesController.delete);

    app.route('/product_category/:id')
        .delete(productCategoryController.delete);

    app.route('/sales_products')
        .get(salesProductsController.get)
        .put(salesProductsController.put)
        .post(salesProductsController.update);

    app.route('/sales_products/:id')
        .delete(salesProductsController.delete)

    app.route('/order_states/:id')
        .delete(order_statesController.delete)

    app.route('/orders/:id')
        .delete(ordersController.delete)

    app.route('/warehouse/:id')
        .delete(warehouseController.delete)


    app.route('/sales_products')
        .get(salesProductsController.get)
        .put(salesProductsController.put)
        .post(salesProductsController.update);

    app.route('/sales_products/:id')
        .delete(salesProductsController.delete)

    app.route('/manufacturers/:id')
        .delete(manufacturersController.delete);
    //Если мы исползьуем делит, то можем в адресной строке сказать, какой ид нужно удалить
    //URL выглядит так:http://localhost:3002/conditions/1 с методом DELETE

    app.route('/conditions/:id')
        .delete(conditionsController.delete);

};