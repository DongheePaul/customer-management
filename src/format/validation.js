'use strict';

const Validator = require('jsonschema').Validator;
const v = new Validator();
const { tokenFormat } = require('./data.format')
v.addSchema(tokenFormat, '/tokenFormat');

const tokenFormatCheck = (token) => {

    const validationResult = v.validate(token, tokenFormat);
        if(validationResult.errors.length !== 0) {
            throw new Error(validationResult.errors)
        }
}


module.exports = {
    tokenFormatCheck
}