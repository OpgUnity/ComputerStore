'use strict';

//подключаем ништяки
const {selectQueryBuilder, appendWhere, appendOrderBy} = require('../queryBuilders');
const {query} = require('../connection')
const {bodyNormalizator, ASC, DESC, responseBuilder} = require('../utils');

//формирование строки запроса на выборку из таблицы с состояниями товара
let selectQueryText = selectQueryBuilder('store.orders');
selectQueryText = appendOrderBy(selectQueryText, {total_amount: ASC});

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
    query("INSERT INTO store.orders (total_amount, state_id, product_id) VALUES ($1, $2, $3)", req.body)
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

exports.delete = async (req, res) => {
    console.log(req.params)
    query("DELETE FROM store.orders where order_id = $1", req.params)
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

exports.update = async (req, res) => {
    console.log(req.body)
    query("UPDATE store.orders SET total_amount = $2 WHERE order_id = $1", req.body)
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