const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Komentar = sequelize.define("komentar", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Komentar;
