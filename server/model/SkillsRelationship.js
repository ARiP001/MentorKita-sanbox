const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const SkillsRelationship = sequelize.define("skillsRelationship", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

module.exports = SkillsRelationship;
