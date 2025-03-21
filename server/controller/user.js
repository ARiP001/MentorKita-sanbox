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

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.TOKEN_SECRET_KEY;
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

    const token = jwt.sign({ userId: newMentee.id, role: "MENTEE" }, key, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "Success",
      message: "Mentee registration successful!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
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

    const token = jwt.sign(
      { userId: currentUser.id, role: currentUser.role },
      key,
      { algorithm: "HS256", expiresIn: "1h" }
    );

    res.status(200).json({
      status: "Success",
      message: "Login berhasil!",
      token,
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
      mentee: {
        id: loggedUser.id,
        fullname: loggedUser.fullName,
        email: loggedUser.email,
        phoneNumber: loggedUser.phoneNumber,
        about: loggedUser.about,
      },
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

    let imageUrl = currentUser.profilePicture;
    if (req.file) {
      const file = req.file;
      const uploadOption = {
        folder: "Profile_Member/",
        public_id: `user_${currentUser.id}`,
        overwrite: true,
      };
      const uploadFile = await cloudinary.uploader.upload(
        file.path,
        uploadOption
      );
      imageUrl = uploadFile.secure_url;
      fs.unlinkSync(file.path);
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
        message: "All fields must be provided",
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
      menteeId: currentUser.id,
    });

    // Create experience entries
    const experiencesData = experiences.map((exp) => ({
      year: exp.year,
      desc: exp.desc,
      mentorId: newMentor.id,
    }));

    await Experience.bulkCreate(experiencesData);

    // Update the mentee's role to MENTOR
    await currentUser.update({ role: "MENTOR" });

    res.status(201).json({
      status: "Success",
      message: "Berhasil menjadi mentor!",
      mentor: newMentor,
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

// const getMentor
const searchMentor = async (req, res) => {
  try {
    const { fullName } = req.body;

    // Ensure that fullName is provided
    if (!fullName) {
      return res.status(400).json({
        status: "Error",
        message: "Full name is required to search for a mentor.",
      });
    }

    // Find all mentees whose name matches the search query and ensure they are mentors
    const mentees = await Mentee.findAll({
      where: {
        fullName: {
          [Op.like]: `%${fullName}%`,
        },
        role: "MENTOR", // Ensure we are only getting mentors
      },
      include: [
        {
          model: Mentor,
          required: true,
        },
      ],
    });

    // Debugging: log the mentees found
    console.log("Mentees found:", mentees);

    if (mentees.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No mentors found with the given mentee name.",
      });
    }

    const mentors = mentees.map((mentee) => ({
      mentorId: mentee.mentors[0].id,
      menteeId: mentee.id,
      fullName: mentee.fullName, //
      // email: mentee.email,
      about: mentee.about, //
      job: mentee.mentors[0].job, //
      // lokasi: mentee.mentors[0].lokasi,
      rating: mentee.mentors[0].rating, //
    }));

    res.status(200).json({
      status: "Success",
      mentors,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = {
  postUser,
  loginHandler,
  getUserProfile,
  editUserAccount,
  beMentor,
  searchMentor,
  addExperience,
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
