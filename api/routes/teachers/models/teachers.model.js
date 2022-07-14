const BaseModel = require('../../../db');

class Teachers extends BaseModel {
    static get tableName() {
        return 'teachers';
    }
}

module.exports = Teachers;