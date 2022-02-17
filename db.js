const knex = require("knex")({
  client: "pg",
  connection: {
    user: "szpaku",
    password: "Windranger123",
    host: "localhost",
    port: 5432,
    database: "incamp",
  },
});

module.exports = knex;
