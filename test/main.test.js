const {bodyNormalisator} = require('../server/utils');
test('String', () => {
    expect(bodyNormalisator({
        a: 1, b: 2, c: "dfdsaf", condition_name: "test", condition_description: "test1"}
    )).toEqual({
        condition_name: "test",
        condition_description: "test1"
    });
});

const {selectQueryBuilder} = require('../server/queryBuilders');
test('Select', () => {
    expect(selectQueryBuilder("Green")).toEqual("select * from Green");
});

const {appendWhere} = require('../server/queryBuilders');
test('Where', () => {
    expect(appendWhere("Green","black")).toEqual("Green WHERE black");
    expect(appendWhere("Green",["black","orange"])).toEqual("Green WHERE black orange");
});

const {appendOrderBy} = require('../server/queryBuilders');
test('Order by', () => {
    expect(appendOrderBy("Green","black")).toEqual("Green ORDER BY black");
});

