'use strict';

//Тут прописаны все маршруты и методы, по которым их можно достичь
//Все маршруты строятся так
//  http://localhost:тут порт/а тут маршруты
module.exports = function (app) {

    let mainController = require('../controllers/conditionsController');

    app.route('/login')
        .post(mainController.login);

    //Например для этого с методом GET
    // http://localhost:3002/conditions
    app.route('/conditions')
        .get(mainController.get)
        .put(mainController.put)
        .post(mainController.update);

    //Если мы исползьуем делит, то можем в адресной строке сказать, какой ид нужно удалить
    //URL выглядит так:http://localhost:3002/conditions/1 с методом DELETE

    app.route('/conditions/:id')
        .delete(mainController.delete);

};