const {
    Model,
    QueryBuilder
} = require('objection');
const { modelPaths } = require('./routes/students/models/classes.model');

const knex = require('knex')(require('./knexfile'));

Model.knex(knex)

class BaseModel extends Model {
    static get defaultSchema() {
        return 'StudentSchool1.public'
    }
}

module.exports = BaseModel