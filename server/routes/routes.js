'use strict';

module.exports = function (app) {

    let mainController = require('../controllers/mainController');

    app.route('/login')
        .post(mainController.login);

    app.route('/conditions')
        .get(mainController.get)
        .put(mainController.put)
        .post(mainController.update);

    app.route('/conditions/:id')
        .delete(mainController.delete);

    let testContrller = require('../controllers/testController')
    app.route('/somePath').get(testContrller.testPath)

    app.route('/somePath1').get(testContrller.testPath1)
};