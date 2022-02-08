const knex = require("knex")({
  client: "pg",
  connection: {
    user: "<username>",
    password: "<password>",
    host: "<host>",
    post: <port>,
    database: "<databaseName>",
  },
});

module.exports = knex;
