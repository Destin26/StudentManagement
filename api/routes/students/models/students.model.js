const BaseModel = require('../../../db')
const moment = require('moment');


class Student extends BaseModel {
    static get tableName() {
        return 'students';
    }

    static get relationMappings() {
        const Marks = require('../../marks/models/marks.model');

        return {
            mark: {
                relation: BaseModel.HasManyRelation,
                modelClass: Marks,
                join: {
                    from: 'students.id',
                    to: 'marks.studentid'
                }
            }
        }

    }

    fullName() {
        return this.firstname + ' ' + this.lastname
    }

    $beforeInsert() {
        this.createdat = moment()
            .utc()
            .format('YYYY/MM/DD HH:mm:ss');

        this.updatedat = moment()
            .utc()
            .format('YYYY/MM/DD HH:mm:ss');
    }

    $beforeUpdate() {
        this.updatedat = moment()
            .utc()
            .format('YYYY/MM/DD HH:mm:ss');
    }
}

module.exports = Student;