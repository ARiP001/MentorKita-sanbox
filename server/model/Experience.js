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
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = Experience;