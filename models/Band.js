const { Sequelize, db } = require("../db/connection");

let Band = db.define("Band", {
  name: Sequelize.STRING,
  genre: Sequelize.STRING,
});

module.exports = Band;
