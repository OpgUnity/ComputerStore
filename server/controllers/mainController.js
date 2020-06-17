'use strict';

const {Pool} = require("pg");
const {userName, password, dbName} = require("../../secret");

let pool;

const createPool = () => new Pool({
    host: "pg2.sweb.ru",
    port: 5432,
    user: userName,
    password: password,
    database: dbName,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

const uuidv4 = () => { // Ваня сказал не трогать и не вникать в суть, потому что он сам не знает
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let sessionId = '';

const selectQueryText = 'select * from store.condition order by condition_name';

const insertQueryText = `insert into store.condition (condition_name, condition_description)
                         values ($1, $2)`;

const deleteQueryText = `delete
                         from store.condition
                         where condition_id = $1`;

const updateQueryText = `update store.condition
                         set condition_name        =$2,
                             condition_description =$3
                         where condition_id = $1`;

const selectQuery = async () => await pool.query(selectQueryText);
const insertQuery = async value => await pool.query(insertQueryText, Object.values(value));
const deleteQuery = async value => await pool.query(deleteQueryText, Object.values(value));
const updateQuery = async value => await pool.query(updateQueryText, Object.values(value));

const bodyNormalisator = body => ({
    condition_name: body.condition_name,
    condition_description: body.condition_description
})

exports.get = async (req, res) =>
    selectQuery()
        .then(results => {
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
            res.json(response);
        })
        .catch(err => {
            console.log(`${err.name} code: ${err.code}`);
            res.json({
                success: false,
                body: {
                    error: err.name
                }
            })
        });

exports.put = async (req, res) =>
    insertQuery(bodyNormalisator(req.body))
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
    deleteQuery(req.params)
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
    updateQuery(req.body)
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

const select = async () => await pool.query(`select now();`);


exports.login = async (req, res) => {
    console.log(req.body);
    pool = createPool(req.body);
    select()
        .then(result => {
            sessionId = uuidv4();
            res.json({
                success: true,
                body: {
                    sessionKey: sessionId
                }
            })
        })
        .catch(err => res.json({
            success: false,
            body: {
                reason: err.routine === 'auth_failed' ? 'auth_failed' : 'Check server info for details'
            }
        }));
}