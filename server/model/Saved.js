const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Saved = sequelize.define("saved", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Saved;
