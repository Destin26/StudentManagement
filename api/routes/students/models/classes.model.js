const { Model } = require('objection')

class Classes extends Model {
    static get tableName() {
        return 'classes';
    }
}

module.exports = Classes;