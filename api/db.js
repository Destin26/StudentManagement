const {
    Model,
    QueryBuilder
} = require('objection');

const knex = require('knex')(require('./knexfile'));

Model.knex(knex)

class BaseModel extends Model {
    static get defaultSchema() {
        return 'StudentSchool1.public'
    }
}

module.exports = BaseModel