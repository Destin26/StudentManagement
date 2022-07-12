const BaseModel = require('../../../db')

class Exams extends BaseModel {
    static get tableName() {
        return 'exams';
    }

    static get relationMappings() {
        const Marks = require('./marks.model');
        return {

            mark: {
                relation: BaseModel.HasManyRelation,
                modelClass: Marks,
                join: {
                    from: 'exams.id',
                    to: 'marks.examid'
                }
            }
        }
    }
}

module.exports = Exams;