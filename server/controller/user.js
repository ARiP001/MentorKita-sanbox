require("dotenv").config();

const Mentee = require("../model/Mentee");
const Mentor = require("../model/Mentor");
const Saved = require("../model/Saved");
const Comment = require("../model/Komentar");
const Course = require("../model/Course");
const CourseRelationship = require("../model/CourseRelationship");
const Skills = require("../model/Skills");
const SkillsRelationship = require("../model/SkillsRelationship");
const Experience = require("../model/Experience");
const { Op } = require("sequelize");
const Mentoring = require("../model/Mentoring");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.TOKEN_SECRET_KEY;
const refreshKey = process.env.REFRESH_TOKEN_SECRET_KEY || process.env.TOKEN_SECRET_KEY;
const cloudinary = require("../util/cloudinary_config");
const fs = require("fs");
const { post } = require("../routes/userRoutes");

// Register
const postUser = async (req, res) => {
  try {
    console.log("berhasilPostuser");
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newMentee = await Mentee.create({
      fullName,
      email,
      password: hashedPassword,
      role: "MENTEE",
    });

    const accessToken = jwt.sign({ userId: newMentee.id, role: "MENTEE" }, key, {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });

    const refreshToken = jwt.sign({ userId: newMentee.id }, refreshKey, {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });

    // Save refresh token to database
    await newMentee.update({ refreshToken });

    res.status(201).json({
      status: "Success",
      message: "Mentee registration successful!",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Create mentoring request (mentee -> mentor)
const requestMentoring = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return res.status(404).json({ status: "Error", message: `Pengguna dengan id ${decoded.userId} tidak ditemukan` });
    }

    const { mentorId, courseId, note, startAt } = req.body;
    if (!mentorId) {
      return res.status(400).json({ status: "Error", message: "mentorId wajib diisi" });
    }

    // Optional: ensure mentor exists
    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ status: "Error", message: "Mentor tidak ditemukan" });
    }

    const newReq = await Mentoring.create({
      mentorId,
      menteeId: currentUser.id,
      courseId: courseId || null,
      status: "WAITING",
      note: note || null,
      startAt: startAt || null,
    });

    res.status(201).json({
      status: "Success",
      message: "Permintaan mentoring dibuat",
      data: newReq,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Accept mentoring request (mentor side)
const acceptMentoring = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser || currentUser.role !== "MENTOR") {
      return res.status(403).json({ status: "Error", message: "Hanya mentor yang dapat menerima permintaan" });
    }

    const mentor = await Mentor.findOne({ where: { menteeId: currentUser.id } });
    if (!mentor) return res.status(404).json({ status: "Error", message: "Profil mentor tidak ditemukan" });

    const { id } = req.params;
    const mentoring = await Mentoring.findByPk(id);
    if (!mentoring) return res.status(404).json({ status: "Error", message: "Permintaan mentoring tidak ditemukan" });
    if (mentoring.mentorId !== mentor.id) return res.status(403).json({ status: "Error", message: "Tidak berhak mengubah data ini" });

    await mentoring.update({ status: "ON_PROGRESS", startAt: new Date() });
    res.status(200).json({ status: "Success", message: "Permintaan diterima", data: mentoring });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Complete mentoring (mentor side)
const completeMentoring = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser || currentUser.role !== "MENTOR") {
      return res.status(403).json({ status: "Error", message: "Hanya mentor yang dapat menandai selesai" });
    }

    const mentor = await Mentor.findOne({ where: { menteeId: currentUser.id } });
    if (!mentor) return res.status(404).json({ status: "Error", message: "Profil mentor tidak ditemukan" });

    const { id } = req.params;
    const mentoring = await Mentoring.findByPk(id);
    if (!mentoring) return res.status(404).json({ status: "Error", message: "Data mentoring tidak ditemukan" });
    if (mentoring.mentorId !== mentor.id) return res.status(403).json({ status: "Error", message: "Tidak berhak mengubah data ini" });

    await mentoring.update({ status: "DONE", endAt: new Date() });
    res.status(200).json({ status: "Success", message: "Mentoring selesai", data: mentoring });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

module.exports = { postUser };

// Login
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await Mentee.findOne({ where: { email } });

    if (!currentUser) {
      return res.status(400).json({
        status: "Error",
        message: "Email atau password salah",
      });
    } else {
      console.log(
        `Login attempt with email: ${email} | pw: ${password} |> successful`
      );
    }

    const checkPassword = await bcrypt.compare(password, currentUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Email atau password salah",
      });
    }

    const accessToken = jwt.sign(
      { userId: currentUser.id, role: currentUser.role },
      key,
      { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign({ userId: currentUser.id }, refreshKey, {
      algorithm: "HS256",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // Save refresh token to database
    await currentUser.update({ refreshToken });

    res.status(200).json({
      status: "Success",
      message: "Login berhasil!",
      accessToken,
      refreshToken,
      role: currentUser.role,
      userId: currentUser.id,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Profile Mentee
const getUserProfile = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(400).json({
        status: "Error",
        message: "Anda harus login",
      });
    }

    const decoded = jwt.verify(token, key);
    const loggedUser = await Mentee.findOne({
      where: { id: decoded.userId },
    });

    if (!loggedUser) {
      return res.status(404).json({
        status: "Error",
        message: `Pengguna dengan id ${decoded.userId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil data pengguna",
      role: loggedUser.role,
      mentee: {
        id: loggedUser.id,
        fullname: loggedUser.fullName,
        email: loggedUser.email,
        phoneNumber: loggedUser.phoneNumber,
        about: loggedUser.about,
        profilePict: loggedUser.profilePict,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Get top rated mentors (limited fields)
const getTopMentors = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const mentors = await Mentor.findAll({
      attributes: ["id", "fullName", "job", "rating", "profilePict"],
      order: [["rating", "DESC"]],
      limit,
    });
    res.status(200).json({
      status: "Success",
      message: "Top mentors retrieved successfully",
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const editUserAccount = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({
        status: "Error",
        message: "Anda harus login",
      });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return res.status(404).json({
        status: "Error",
        message: `Pengguna dengan id ${decoded.userId} tidak ditemukan`,
      });
    }

    let imageUrl = currentUser.profilePict;
    if (req.file) {
      const file = req.file;
      const uploadOption = {
        folder: process.env.CLOUDINARY_PROFILE_FOLDER || "Profile_Member/",
        public_id: `user_${currentUser.id}`,
        overwrite: true,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      };
      
      // Convert buffer to base64 for Cloudinary
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      
      const uploadFile = await cloudinary.uploader.upload(
        base64String,
        uploadOption
      );
      imageUrl = uploadFile.secure_url;
    }

    await Mentee.update(
      {
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        about: req.body.about,
        profilePict: imageUrl,
      },
      { where: { id: decoded.userId } }
    );

    res.status(200).json({
      status: "Success",
      message: "Data pengguna berhasil diubah",
      mentee: {
        id: currentUser.id,
        fullname: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        about: req.body.about,
        profilePict: imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const beMentor = async (req, res) => {
  try {
    console.log("beMentor request body:", req.body);
    
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({
        status: "Error",
        message: "Anda harus login",
      });
    }

    const decoded = jwt.verify(token, key);
    let currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return res.status(404).json({
        status: "Error",
        message: `Pengguna dengan id ${decoded.userId} tidak ditemukan`,
      });
    }

    const {
      fullName,
      phoneNumber,
      email,
      about,
      job,
      lokasi,
      rating,
      experiences,
      courses,
      skills,
    } = req.body;

    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !about ||
      !job ||
      !lokasi ||
      !rating ||
      !experiences
    ) {
      return res.status(400).json({
        status: "Error",
        message: "All required fields must be provided",
      });
    }

    if (!experiences || !Array.isArray(experiences)) {
      return res.status(400).json({
        status: "Error",
        message: "Experiences must be provided as an array",
      });
    }

    // Update current user's information
    currentUser = await currentUser.update({
      fullName,
      phoneNumber,
      email,
      about,
    });

    // Create a new mentor entry
    const newMentor = await Mentor.create({
      fullName,
      phoneNumber,
      email,
      about,
      job,
      lokasi,
      rating,
      profilePict: currentUser.profilePict,
      menteeId: currentUser.id,
    });

    // Create experience entries
    console.log("Creating experiences:", experiences);
    const experiencesData = experiences.map((exp) => ({
      year: exp.year,
      title: exp.title,
      detail: exp.detail,
      mentorId: newMentor.id,
    }));

    await Experience.bulkCreate(experiencesData);
    console.log("Experiences created successfully");

    // Handle courses if provided
    console.log("Processing courses:", courses);
    if (courses && courses.length > 0) {
      for (const courseName of courses) {
        // Find or create course
        let course = await Course.findOne({ where: { nama_course: courseName } });
        if (!course) {
          course = await Course.create({ nama_course: courseName });
          console.log("Created new course:", courseName);
        }
        
        // Create course relationship
        await CourseRelationship.create({
          mentorId: newMentor.id,
          courseId: course.id,
        });
        console.log("Created course relationship for:", courseName);
      }
    }

    // Handle skills if provided
    console.log("Processing skills:", skills);
    if (skills && skills.length > 0) {
      for (const skillName of skills) {
        // Find or create skill
        let skill = await Skills.findOne({ where: { nama_skills: skillName } });
        if (!skill) {
          skill = await Skills.create({ nama_skills: skillName });
          console.log("Created new skill:", skillName);
        }
        
        // Create skill relationship
        await SkillsRelationship.create({
          mentorId: newMentor.id,
          skillId: skill.id,
        });
        console.log("Created skill relationship for:", skillName);
      }
    }

    // Update the mentee's role to MENTOR
    await currentUser.update({ role: "MENTOR" });

    res.status(201).json({
      status: "Success",
      message: "Berhasil menjadi mentor!",
      mentor: newMentor,
      experiences: experiencesData,
      courses: courses || [],
      skills: skills || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const addExperience = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({
        status: "Error",
        message: "Anda harus login",
      });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });

    if (!currentUser) {
      return res.status(404).json({
        status: "Error",
        message: `Pengguna dengan id ${decoded.userId} tidak ditemukan`,
      });
    }

    if (currentUser.role !== "MENTOR") {
      return res.status(403).json({
        status: "Error",
        message: "Anda bukan seorang mentor",
      });
    }

    const { experiences } = req.body;

    if (!experiences || !Array.isArray(experiences)) {
      return res.status(400).json({
        status: "Error",
        message: "Experiences must be provided as an array",
      });
    }

    // Find the mentor entry
    const mentor = await Mentor.findOne({
      where: { menteeId: currentUser.id },
    });

    if (!mentor) {
      return res.status(404).json({
        status: "Error",
        message: "Mentor profile not found",
      });
    }

    // Create experience entries
    const experiencesData = experiences.map((exp) => ({
      year: exp.year,
      desc: exp.desc,
      mentorId: mentor.id,
    }));

    await Experience.bulkCreate(experiencesData);

    res.status(201).json({
      status: "Success",
      message: "Experiences added successfully!",
      experiences: experiencesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Search Mentors
const searchMentor = async (req, res) => {
  try {
    const { fullName } = req.body;

    console.log("Searching for mentor with name:", fullName);

    // Ensure that fullName is provided
    if (!fullName) {
      return res.status(400).json({
        status: "Error",
        message: "Full name is required to search for a mentor.",
      });
    }

    // Search directly in Mentor table
    const mentors = await Mentor.findAll({
      where: {
        fullName: {
          [Op.like]: `%${fullName}%`,
        },
      },
      include: [
        {
          model: Mentee,
          attributes: ['id', 'email', 'phoneNumber', 'about', 'profilePict'],
        },
      ],
    });

    console.log("Mentors found:", mentors.length);
    console.log("Found mentors:", mentors.map(m => m.fullName));

    if (mentors.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: `No mentors found with the name "${fullName}".`,
      });
    }

    const mentorResults = mentors.map((mentor) => ({
      mentorId: mentor.id,
      menteeId: mentor.menteeId,
      fullName: mentor.fullName,
      email: mentor.email,
      phoneNumber: mentor.phoneNumber,
      about: mentor.about,
      job: mentor.job,
      lokasi: mentor.lokasi,
      rating: mentor.rating,
      profilePict: mentor.mentee?.profilePict,
    }));

    res.status(200).json({
      status: "Success",
      message: `Found ${mentorResults.length} mentor(s)`,
      mentors: mentorResults,
    });
  } catch (error) {
    console.error("Search mentor error:", error);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Refresh Token
const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: "Error",
        message: "Refresh token is required",
      });
    }

    console.log("Refresh token received:", refreshToken);
    console.log("Refresh key:", refreshKey);

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, refreshKey);
    console.log("Decoded token:", decoded);

    const user = await Mentee.findOne({ 
      where: { 
        id: decoded.userId,
        refreshToken: refreshToken 
      } 
    });

    console.log("User found:", user ? "Yes" : "No");
    console.log("User refresh token in DB:", user?.refreshToken);

    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid refresh token - user not found or token mismatch",
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, role: user.role },
      key,
      { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.status(200).json({
      status: "Success",
      message: "Token refreshed successfully!",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log("Refresh token error:", error.message);
    res.status(401).json({
      status: "Error",
      message: `Invalid refresh token: ${error.message}`,
    });
  }
};

// Get all mentors with their courses
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      include: [
        {
          model: Course,
          through: CourseRelationship,
        },
        {
          model: Mentee,
          attributes: ['id', 'profilePict'],
        }
      ]
    });

    res.status(200).json({
      status: "Success",
      message: "Mentors retrieved successfully",
      data: mentors,
      count: mentors.length
    });
  } catch (error) {
    console.error("Error getting mentors:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve mentors",
      error: error.message
    });
  }
};

// Get mentor's mentoring list (for dashboard/course page)
const getMentorMentorings = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser || currentUser.role !== "MENTOR") {
      return res.status(403).json({ status: "Error", message: "Hanya mentor yang dapat mengakses" });
    }

    const mentor = await Mentor.findOne({ where: { menteeId: currentUser.id } });
    if (!mentor) return res.status(404).json({ status: "Error", message: "Profil mentor tidak ditemukan" });

    const items = await Mentoring.findAll({ where: { mentorId: mentor.id }, order: [["createdAt", "DESC"]] });

    // Hydrate with mentee info
    const menteeIds = [...new Set(items.map(i => i.menteeId))];
    const mentees = await Mentee.findAll({ where: { id: menteeIds } });
    const idToMentee = new Map(mentees.map(m => [m.id, m]));

    const response = items.map(i => ({
      id: i.id,
      menteeId: i.menteeId,
      menteeName: idToMentee.get(i.menteeId)?.fullName,
      menteeProfilePict: idToMentee.get(i.menteeId)?.profilePict,
      courseId: i.courseId,
      status: i.status,
      startAt: i.startAt,
      endAt: i.endAt,
      note: i.note,
    }));

    res.status(200).json({ status: "Success", data: response });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Get mentee's mentoring list (for user dashboard)
const getMenteeMentorings = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return res.status(404).json({ status: "Error", message: `Pengguna dengan id ${decoded.userId} tidak ditemukan` });
    }

    const items = await Mentoring.findAll({ where: { menteeId: currentUser.id }, order: [["createdAt", "DESC"]] });

    // Hydrate with mentor info
    const mentorIds = [...new Set(items.map(i => i.mentorId))];
    const mentors = await Mentor.findAll({ where: { id: mentorIds } });
    const courseIds = [...new Set(items.map(i => i.courseId).filter(Boolean))];
    const courses = await Course.findAll({ where: { id: courseIds } });
    const idToMentor = new Map(mentors.map(m => [m.id, m]));
    const idToCourse = new Map(courses.map(c => [c.id, c]));

    const response = items.map(i => ({
      id: i.id,
      mentorId: i.mentorId,
      mentorName: idToMentor.get(i.mentorId)?.fullName,
      mentorJob: idToMentor.get(i.mentorId)?.job,
      mentorProfilePict: idToMentor.get(i.mentorId)?.profilePict,
      courseId: i.courseId,
      courseName: i.courseId ? idToCourse.get(i.courseId)?.nama_course : undefined,
      status: i.status,
      startAt: i.startAt,
      endAt: i.endAt,
      note: i.note,
    }));

    res.status(200).json({ status: "Success", data: response });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Get mentor detail with all related data
const getMentorDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const mentor = await Mentor.findByPk(id, {
      include: [
        {
          model: Course,
          through: CourseRelationship,
        },
        {
          model: Skills,
          through: SkillsRelationship,
        },
        {
          model: Experience,
        },
        {
          model: Mentee,
          attributes: ['id', 'profilePict'],
        },
        {
          model: Comment,
          include: [
            {
              model: Mentee,
              attributes: ['id', 'fullName', 'profilePict'],
            }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!mentor) {
      return res.status(404).json({
        status: "Error",
        message: "Mentor not found",
      });
    }

    // Fetch mentorings for this mentor
    const mentorings = await Mentoring.findAll({ where: { mentorId: mentor.id } });
    const menteeIds = [...new Set(mentorings.map((m) => m.menteeId))];
    const mentees = await Mentee.findAll({ where: { id: menteeIds } });
    const idToMentee = new Map(mentees.map((m) => [m.id, m]));

    const mentoringList = mentorings.map((m) => ({
      id: m.id,
      mentee: idToMentee.get(m.menteeId)
        ? {
            id: idToMentee.get(m.menteeId).id,
            fullName: idToMentee.get(m.menteeId).fullName,
            profilePict: idToMentee.get(m.menteeId).profilePict,
          }
        : { id: m.menteeId },
      courseId: m.courseId,
      status: m.status,
      startAt: m.startAt,
      endAt: m.endAt,
      note: m.note,
    }));

    res.status(200).json({
      status: "Success",
      message: "Mentor detail retrieved successfully",
      data: { ...mentor.toJSON(), mentorings: mentoringList }
    });
  } catch (error) {
    console.error("Error getting mentor detail:", error);
    res.status(500).json({
      status: "Error",
      message: "Failed to retrieve mentor detail",
      error: error.message
    });
  }
};

// Add comment from mentee to mentor
const addComment = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser) {
      return res.status(404).json({ status: "Error", message: `Pengguna dengan id ${decoded.userId} tidak ditemukan` });
    }

    const { mentorId, body } = req.body;
    if (!mentorId || !body) {
      return res.status(400).json({ status: "Error", message: "mentorId dan body wajib diisi" });
    }

    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) return res.status(404).json({ status: "Error", message: "Mentor tidak ditemukan" });

    const comment = await Comment.create({ mentorId, menteeId: currentUser.id, body });

    res.status(201).json({ status: "Success", message: "Komentar ditambahkan", data: comment });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Get comments for current mentor (with mentee info)
const getMentorComments = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    let token;
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substring(7);
    } else {
      return res.status(403).json({ status: "Error", message: "Anda harus login" });
    }

    const decoded = jwt.verify(token, key);
    const currentUser = await Mentee.findOne({ where: { id: decoded.userId } });
    if (!currentUser || currentUser.role !== "MENTOR") {
      return res.status(403).json({ status: "Error", message: "Hanya mentor yang dapat mengakses" });
    }

    const mentor = await Mentor.findOne({ where: { menteeId: currentUser.id } });
    if (!mentor) return res.status(404).json({ status: "Error", message: "Profil mentor tidak ditemukan" });

    const comments = await Comment.findAll({
      where: { mentorId: mentor.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Mentee,
          attributes: ["id", "fullName", "profilePict"],
        },
      ],
    });

    const data = comments.map((c) => ({
      id: c.id,
      body: c.body,
      createdAt: c.createdAt,
      mentee: {
        id: c.mentee?.id,
        fullName: c.mentee?.fullName,
        profilePict: c.mentee?.profilePict,
      },
    }));

    res.status(200).json({ status: "Success", data });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

module.exports = {
  postUser,
  loginHandler,
  getUserProfile,
  editUserAccount,
  getTopMentors,
  requestMentoring,
  acceptMentoring,
  completeMentoring,
  addComment,
  getMentorComments,
  getMenteeMentorings,
  beMentor,
  searchMentor,
  addExperience,
  refreshTokenHandler,
  getAllMentors,
  getMentorMentorings,
  getMentorDetail,
};

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/mentorDetail/:id",
    element: <MentorDetail />,
  },
  {
    path: "/searchMentor",
    element: <SearchMentor />,
  },
  {
    path: "/courseMentor",
    element: <CourseMentor />,
  },
  {
    path: "/courseUser",
    element: <CourseUser />,
  },
  {
    path: "/BecomeAMentor",
    element: <BecomeAMentor />,
  },
  {
    path: "/profileMentor/:id",
    element: <ProfileMentor />,
  },
  {
    path: "/profileUser/:id",
    element: <ProfileUser />,
  },
  {
    path: "/loginUser",
    element: <LoginUser />,
  },
  {
    path: "/registerUser",
    element: <RegisterUser />,
  },
]);
*/
