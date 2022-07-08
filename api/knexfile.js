// Update with your config settings.
let knexconfig = {

  development: {
    client: 'pg',
    connection: {
      database: 'StudentSchool1',
      user: 'postgres',
      password: '0000'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};

module.exports = knexconfig.development;