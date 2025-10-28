const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Mentoring = sequelize.define("mentoring", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  mentorId: { type: Sequelize.INTEGER, allowNull: false },
  menteeId: { type: Sequelize.INTEGER, allowNull: false },
  courseId: { type: Sequelize.INTEGER, allowNull: true },
  status: {
    type: Sequelize.ENUM("WAITING", "ON_PROGRESS", "DONE", "CANCELLED"),
    allowNull: false,
    defaultValue: "WAITING",
  },
  startAt: { type: Sequelize.DATE, allowNull: true },
  endAt: { type: Sequelize.DATE, allowNull: true },
  note: { type: Sequelize.TEXT, allowNull: true },
});

module.exports = Mentoring;


