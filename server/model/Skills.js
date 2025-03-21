const sequelize = require("../util/db_connect");
const Sequelize = require("sequelize");

const Skills = sequelize.define("skills", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_skills: {
    type: Sequelize.ENUM,
    values: [
      'Advertising',
      'Branding',
      'Back-End Development',
      'Front-End Development',
      'Enterpreneurship',
      'Marketing',
      'Project Managering',
      'UX Designer'
    ],
    allowNull: false,
  }
});

module.exports = Skills;
