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
    const a ='test2'
    const b = 'Orange'
    expect(selectQueryBuilder("Green")).toEqual("select * from Green");
    //expect(selectQueryBuilder(["Green",'test'])).toEqual("select * from Green, test");
    expect(selectQueryBuilder("Green",'test')).toEqual("select test from Green");
    expect(selectQueryBuilder("Green",['test','test2'])).toEqual("select test, test2 from Green");
    expect(selectQueryBuilder("Green",['test',a])).toEqual("select test, test2 from Green");
    //expect(selectQueryBuilder(["Green",b],['test',a])).toEqual("select test, test2 from Green Orange");
});

const {appendWhere} = require('../server/queryBuilders');
test('Where', () => {
    const a = 'test'
    const b = 'Orange'
    expect(appendWhere("Green", a )).toEqual("Green WHERE test");
    expect(appendWhere("Green", [a,'test2'] )).toEqual("Green WHERE test test2");
    expect(appendWhere("Green","black")).toEqual("Green WHERE black");
    expect(appendWhere("Green",["black","orange"])).toEqual("Green WHERE black orange");
});

const {appendOrderBy} = require('../server/queryBuilders');
test('Order by', () => {
    const a = 'test'
   // expect(appendOrderBy("Green",{g:'test',g:'test2'})).toEqual("Green ORDER BY test test2"); // не отрабатывает
    expect(appendOrderBy("Green",a)).toEqual("Green ORDER BY test");
    expect(appendOrderBy("Green","black")).toEqual("Green ORDER BY black");

});
