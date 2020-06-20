'use strict';

//подключаем ништяки
const {selectQueryBuilder, appendWhere, appendOrderBy} = require('../queryBuilders');
const {query} = require ('../connection')
const {bodyNormalizator, ASC, DESC} = require('../utils');

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
            //2.при успешной отработке в этом блоке берём данные
            var rows = [];
            if (results.rows.length > 0 && results.rows)
                rows = results.rows.map(row => ({id: row.condition_id, ...row}))
            var response = {
                success: true,
                body: {
                    rows: rows.map(row => {
                        delete row.condition_id;
                        return row
                    }),
                    rowNames: results.fields.map(item => item.name)
                }
            }
            //3.Отправляем их клиенту в формате .json
            res.json(response);
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
        .then(result =>
            res.json({
                success: true,
                body: {
                    pushedEntity: req.body
                }
            }))
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
        .then(result =>
            res.json({
                success: true,
                body: {
                    deletedEntity: req.body
                }
            }))
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
        .then(result =>
            res.json({
                success: true,
                body: {
                    updatedEntity: req.body
                }
            }))
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