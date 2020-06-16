'use strict'

exports.testPath = function (request, response) {
    let obj = {
        firstField: 'string',
        secondField: 6
    };
    response.json(obj)
}

exports.testPath1 = function (request, response) {
    let obj2 = {
        responseText: "I am test path 1"
    }
    response.json(obj2)
}