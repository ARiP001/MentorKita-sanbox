const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Course = require("../model/Course");

const CourseRelationship = sequelize.define("courseRelationship", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});


module.exports = CourseRelationship;
