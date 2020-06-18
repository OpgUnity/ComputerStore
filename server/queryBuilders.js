/**
 *
 * @param tableName {string}
 * @param [fields = "*"]
 * @returns {string}
 */
exports.selectQueryBuilder = (tableName, fields = '*') =>
    (typeof tableName === 'string' && (typeof fields === "string" || fields instanceof Array)) ?
        `select ${fields instanceof Array ?
            fields.join(', ') :
            fields
            } from ${tableName}` :

        new Error( "Неверный тип аргумента");
/**
 *
 * @param selectQueryText {string}
 * @param conditions {(Array.<string>|string)}
 * @returns {string}
 */
exports.appendWhere = (selectQueryText, conditions = []) =>
    typeof conditions === 'string' || conditions instanceof Array?
        `${selectQueryText} WHERE ${Object.values(conditions).join(' ')}` :
        new Error( "Неверный тип аргумента");

/**
 *
 * @param selectQueryText {string}
 * @param orders {({Object[]}|{Object}|string)}
 * @returns {string}
 */
exports.appendOrderBy = (selectQueryText, orders) =>
    orders && orders instanceof Array ?
        `${selectQueryText}
        ORDER BY ${orders.map(order => Object.entries(order)[0].join(' ')).join(', ')}` :
        orders instanceof Object ?
            `${selectQueryText} ORDER BY ${Object.entries(orders)[0].join(' ')}` :
            typeof orders === 'string' ?
                `${selectQueryText} ORDER BY ${orders}` :
                new Error("Неверный тип аргумента");