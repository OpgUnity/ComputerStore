'use strict';

//получение библиотечного объекта, который содержит в себе все соединения
const {Pool} = require("pg");
const {userName, password, dbName, host, port} = require("../secret");

//создание пула с настройками
const connectionsPool = new Pool({
    host: host,
    port: port,
    user: userName,
    password: password,
    database: dbName,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

exports.pool = connectionsPool;

//создание функции, которая выполняет запрос к базе данных
const query = async (queryString, value = []) =>
    await connectionsPool.query(queryString, Object.values(value));

exports.query = query;