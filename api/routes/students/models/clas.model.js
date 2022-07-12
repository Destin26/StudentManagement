const BaseModel = require('../../../db');

class Clas extends BaseModel {
    static get tableName() {
        return 'classes';
    }

    static get relationMappings() {
        const student = require('./students.model');
        const Marks = require('../../marks/models/marks.model');

        return {
            student: {
                relation: BaseModel.HasOneRelation,
                modelClass: student,
                filter: query => query.select('id', 'firstname', 'lastname', 'guardianname', 'phone'),
                join: {
                    from: 'classes.id',
                    to: 'students.classid'
                }
            },
        }
    }
}

module.exports = Clas;