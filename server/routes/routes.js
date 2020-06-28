'use strict';

//Тут прописаны все маршруты и методы, по которым их можно достичь
//Все маршруты строятся так
//  http://localhost:тут порт/а тут маршруты
module.exports = function (app) {

    let conditionsController = require('../controllers/conditionsController');
    let salesController = require('../controllers/salesController');
    let productCategoryController = require('../controllers/productCategoryController');
    let productsController = require('../controllers/productsController');
    let manufacturersController = require('../controllers/manufacturersController');

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

    app.route('/products')
        .get(productsController.get)
        .put(productsController.put)
        .post(productsController.update);

    app.route('/manufacturers')
        .get(manufacturersController.get)
        .put(manufacturersController.put)
        .post(manufacturersController.update);

    app.route('/conditions/:id')
        .delete(conditionsController.delete);

    app.route('/sales/:id')
        .delete(salesController.delete);

    app.route('/product_category/:id')
        .delete(productCategoryController.delete);

    app.route('/products/:id')
        .delete(productsController.delete);

    app.route('/manufacturers/:id')
        .delete(manufacturersController.delete);
    //Если мы исползьуем делит, то можем в адресной строке сказать, какой ид нужно удалить
    //URL выглядит так:http://localhost:3002/conditions/1 с методом DELETE


};