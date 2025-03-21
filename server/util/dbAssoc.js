require("dotenv").config();
const sequelize = require("./db_connect");
const Mentee = require("../model/Mentee");
const Mentor = require("../model/Mentor");
const Saved = require("../model/Saved");
const Comment = require("../model/Komentar");
const Course = require("../model/Course");
const CourseRelationship = require("../model/CourseRelationship");
const Skills = require("../model/Skills");
const SkillsRelationship = require("../model/SkillsRelationship");
const Experience = require("../model/Experience");
const cloudinary = require("../util/cloudinary_config");
const fs = require("fs");

// Roles
Mentor.belongsToMany(Course, { through: CourseRelationship });
Course.belongsToMany(Mentor, { through: CourseRelationship });

// Skills and Mentor relationship
Mentor.belongsToMany(Skills, { through: SkillsRelationship });
Skills.belongsToMany(Mentor, { through: SkillsRelationship });

// Mentee and Comment relationship
Mentee.hasMany(Comment);
Comment.belongsTo(Mentee);

// Mentor and Experience relationship
Mentor.hasMany(Experience);
Experience.belongsTo(Mentor);

// Mentee and Mentor relationship (one-to-many)
Mentee.hasMany(Mentor, { foreignKey: 'menteeId' });
Mentor.belongsTo(Mentee, { foreignKey: 'menteeId' });

// Mentee and Mentor relationship (many-to-many through Saved)
Mentee.hasMany(Saved);
Saved.belongsTo(Mentee);

const association = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = association;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJNRU5URUUiLCJpYXQiOjE3MTYzNzgyNzEsImV4cCI6MTcxNjM4MTg3MX0.vq7G_tkGgb3J02uVnSfVTF3ksgIY4Vw31cYdvom0rts