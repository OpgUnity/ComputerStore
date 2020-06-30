'use strict';

//подключаем ништяки

const {selectQueryBuilder, appendWhere, appendOrderBy} = require('../queryBuilders');
const {query} = require('../connection')
const {bodyNormalizator, ASC, DESC, responseBuilder} = require('../utils');

//формирование строки запроса на выборку из таблицы с состояниями товара
let selectQueryText = selectQueryBuilder('store.condition');
selectQueryText = appendOrderBy(selectQueryText, {condition_name: ASC});

//TODO заменить на аналогичные  построения запросов после реализации билдеров (спросить у Вани)
const insertQueryText = `insert into store.condition (condition_name, condition_description)
                         values ($1, $2)`;

const deleteQueryText = `delete
                         from store.condition
                         where condition_id = $1`;

const updateQueryText = `update store.condition
                         set condition_name        =$2,
                             condition_description =$3
                         where condition_id = $1`;

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

exports.put = async (req, res) =>
    query(insertQueryText, bodyNormalizator(req.body))
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
            console.log(`${err.name} code: ${err.code}`);
            res.json({
                success: false,
                body: {
                    err: err.name
                }
            })
        });

exports.delete = async (req, res) =>
    query(deleteQueryText, req.params)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
            console.log(`${err.name} code: ${err.code}`);
            res.json({
                success: false,
                body: {
                    err: err.name
                }
            })
        });

exports.update = async (req, res) =>
    query(updateQueryText, req.body)
        .then(results => {
            //3.Отправляем их клиенту в формате .json
            res.json(responseBuilder(results, true));
        })
        .catch(err => {
            console.log(`${err.name} code: ${err.code}`);
            res.json({
                success: false,
                body: {
                    err: err.name
                }
            })
        });


exports.login = async (req, res) => {
    res.json({
        success: true,
        body: {
            sessionKey: 1
        }
    })

}