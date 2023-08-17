'use strict';

const tokenFormat = {
    'id': '/tokenFormat',
    'type': 'object',
    'properties': {
      'id': { 'type': 'integer' },
      'name': { 'type': 'string' },
      'sub': { 'type': 'string' }
    },
    'required': ['id', 'name', 'sub']
};
  

module.exports = {
    tokenFormat
}