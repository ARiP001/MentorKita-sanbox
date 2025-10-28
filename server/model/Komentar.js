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
  },
  menteeId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'mentees',
      key: 'id'
    }
  },
  mentorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'mentors',
      key: 'id'
    }
  }
});

module.exports = Komentar;
