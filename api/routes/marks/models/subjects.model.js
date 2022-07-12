const BaseModel = require('../../../db');


class Subject extends BaseModel {
    static get tableName() {
        return 'subjects';
    }

    static get relationMappings() {
        const Marks = require('./marks.model');
        return {

            mark: {
                relation: BaseModel.HasManyRelation,
                modelClass: Marks,
                join: {
                    from: 'subjects.id',
                    to: 'marks.subjectid'
                }
            }
        }
    }
}

module.exports = Subject