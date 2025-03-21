const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Experience = sequelize.define("experience", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Experience;