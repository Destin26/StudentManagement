const { Model } = require('objection')
const BaseModel = require('../../../db')
const moment = require('moment');

class Student extends BaseModel {
    static get tableName() {
        return 'students';
    }

    static get relationMappings() {
        const classes = require('./classes.model');

        return {
            cls: {
                relation: Model.BelongsToOneRelation,
                modelClass: classes,
                join: {
                    from: 'students.classid',
                    to: 'classes.id'
                }
            }
        }

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