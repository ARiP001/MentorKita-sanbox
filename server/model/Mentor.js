const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Mentor = sequelize.define("mentor", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  about: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  job: {
    type: Sequelize.STRING,
  },
  lokasi: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Mentor;
