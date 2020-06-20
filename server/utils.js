//генератор уникального идентификатора
exports.uuidv4 = () => { // Ваня сказал не трогать и не вникать в суть, потому что он сам не знает
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//функция-нормализатор тела ответа
exports.bodyNormalisator = body => ({
    condition_name: body.condition_name,
    condition_description: body.condition_description
})


//Виды сортировки
exports.ASC = "ASC";
exports.DESC = "DESC";