'use strict';

//Тут прописаны все маршруты и методы, по которым их можно достичь
//Все маршруты строятся так
//  http://localhost:тут порт/а тут маршруты
module.exports = function (app) {

    let conditionsController = require('../controllers/conditionsController');
    let salesController = require('../controllers/salesController');

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

    app.route('/sales/:id')
        .delete(salesController.delete)

    //Если мы исползьуем делит, то можем в адресной строке сказать, какой ид нужно удалить
    //URL выглядит так:http://localhost:3002/conditions/1 с методом DELETE

    app.route('/conditions/:id')
        .delete(conditionsController.delete);

};