'use strict';

//подключаем ништяки
const {selectQueryBuilder, appendWhere, appendOrderBy} = require('../queryBuilders');
const {query} = require('../connection')
const {bodyNormalizator, ASC, DESC} = require('../utils');

//формирование строки запроса на выборку из таблицы с состояниями товара
let selectQueryText = selectQueryBuilder('store.products');
selectQueryText = appendOrderBy(selectQueryText, {product_name: ASC});

//функция, которая реализует один из методов HTTP - запроса
exports.get = async (req, res) =>
    //1.делаем запрос на выборку с помощью ранее сформированной строки
    query(selectQueryText)
        .then(results => {
            //2.при успешной отработке в этом блоке берём данные
            var rows = [];
            if (results.rows.length > 0 && results.rows)
                rows = results.rows.map(row => ({id: row.product_id, ...row}))
            var response = {
                success: true,
                body: {
                    rows: rows.map(row => {
                        delete row.product_id;
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


exports.put = async (req, res) => {
    console.log(req.body)
    query("insert into store.products (product_name, product_description, category_id, sell_price, condition_id, manufacturer_id) values ($1, $2, $3, $4, $5, $6)", req.body)
        .then(result =>
            res.json({
                success: true
            })
        )
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
    query("delete from store.products where product_id = $1", req.params)
        .then(result =>
            res.json({
                success: true
            })
        )
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
    query("update store.products set product_name = $2, product_description = $3, category_id = $4, sell_price = $5, condition_id = $6, manufacturer_id = $7 where product_id = $1", req.body)
        .then(result =>
            res.json({
                success: true
            })
        )
        .catch(err => {
                console.error(err);
                res.json({
                    success: false
                })
            }
        )
}