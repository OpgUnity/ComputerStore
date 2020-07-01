'use strict';

//подключаем ништяки
const {selectQueryBuilder, appendWhere, appendOrderBy} = require('../queryBuilders');
const {query} = require('../connection')
const {bodyNormalizator, ASC, DESC, responseBuilder} = require('../utils');

//формирование строки запроса на выборку из таблицы с состояниями товара
let selectQueryText = selectQueryBuilder('store.order_states');
selectQueryText = appendOrderBy(selectQueryText, {state_name: ASC});

//функция, которая реализует один из методов HTTP - запроса
exports.get = async (req, res) =>
    //1.делаем запрос на выборку с помощью ранее сформированной строки
    query(selectQueryText)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
            //4. Если у нас что-то сломалось, то выводим в консоль на сервере ошибку
            console.error(err);
            console.log(`${err.name} code: ${err.code}`);
            //5. И в ответе говорим клиенту, что всё плохо.
            res.json({
                success: false,
                body: {
                    error: err.name
                }
            })
        });


exports.put = async (req, res) => {
    console.log(req.body)
    query("INSERT INTO store.order_states (state_name) VALUES ($1)", req.body)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
                console.error(err);
                res.json({
                    body:{
                        codeError: err.code,
                        description: err.description
                    },
                    success: false
                })
            }
        )
}

exports.delete = async (req, res) => {
    console.log(req.params)
    query("DELETE FROM store.order_states where state_id = $1", req.params)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
                console.error(err);
                res.json({
                    body:{
                        codeError: err.code,
                        description: err.description
                    },
                    success: false
                })
            }
        )
}

exports.update = async (req, res) => {
    console.log(req.body)
    query("UPDATE store.order_states SET state_name = $2  WHERE state_id = $1", req.body)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
                console.error(err);
                res.json({
                    success: false
                })
            }
        )
}