
const BaseModel = require('../../../db')

class Marks extends BaseModel {
    static get tableName() {
        return 'marks';
    }

    static get relationMappings() {
        const exams = require('./exams.model')
        const students = require('../../students/models/students.model')
        const _class = require('../../students/models/clas.model')

        return {
            exam: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: exams,
                join: {
                    from: 'marks.examid',
                    to: 'exams.id'
                }
            },
            student: {
                relation: BaseModel.HasOneRelation,
                modelClass: students,
                join: {
                    from: 'marks.studentid',
                    to: 'students.id'
                }
            },
        }
    }
}

module.exports = Marks