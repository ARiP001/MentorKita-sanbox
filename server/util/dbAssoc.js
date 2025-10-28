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

// Mentor and Comment relationship (komentar dari mentee ke mentor)
Mentor.hasMany(Comment);
Comment.belongsTo(Mentor);

// Mentor and Experience relationship
Mentor.hasMany(Experience);
Experience.belongsTo(Mentor);

// Mentee and Mentor relationship (one-to-many)
Mentee.hasMany(Mentor, { foreignKey: 'menteeId' });
Mentor.belongsTo(Mentee, { foreignKey: 'menteeId' });

// Saved: connect Mentee and Mentor (many-to-many via explicit join model)
Mentee.belongsToMany(Mentor, { through: Saved, foreignKey: 'menteeId', otherKey: 'mentorId' });
Mentor.belongsToMany(Mentee, { through: Saved, foreignKey: 'mentorId', otherKey: 'menteeId' });

// Also expose direct references on Saved for clarity
Saved.belongsTo(Mentee, { foreignKey: 'menteeId' });
Saved.belongsTo(Mentor, { foreignKey: 'mentorId' });
Mentee.hasMany(Saved, { foreignKey: 'menteeId' });
Mentor.hasMany(Saved, { foreignKey: 'mentorId' });

const association = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = association;