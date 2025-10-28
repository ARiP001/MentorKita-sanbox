const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload_file");
const {
  postUser,
  loginHandler,
  getUserProfile,
  editUserAccount,
  searchMentor,
  beMentor,
  addExperience,
  refreshTokenHandler,
  getAllMentors,
  getMentorDetail,
  getTopMentors,
  requestMentoring,
  acceptMentoring,
  completeMentoring,
  addComment,
  getMentorMentorings,
  getMentorComments,
  getMenteeMentorings,
} = require("../controller/user");

// Routes for Mentee

router.post("/users/registerUser", postUser);

router.post("/users/loginUser", loginHandler);

router.get("/users/profileUser", getUserProfile);

router.put(
  "/users/editUserProfile",
  upload.single("profilePict"),
  editUserAccount
);

//Routes for mentor
router.post ("/users/BecomeAMentor", beMentor);

router.get ("/users/searchMentor", searchMentor);

router.get ("/users/getAllMentors", getAllMentors);

router.get ("/users/mentorDetail/:id", getMentorDetail);

router.get ("/users/getTopMentors", getTopMentors);

// Mentoring request
router.post("/users/requestMentoring", requestMentoring);

// Mentor actions on mentoring
router.put("/users/mentoring/:id/accept", acceptMentoring);
router.put("/users/mentoring/:id/complete", completeMentoring);

// Mentor dashboard data
router.get("/users/getMentorMentorings", getMentorMentorings);
router.get("/users/getMentorComments", getMentorComments);

// Mentee dashboard data
router.get("/users/getMenteeMentorings", getMenteeMentorings);

router.post ("/users/addExperience", addExperience);

// Comments
router.post("/users/addComment", addComment);

// Refresh token endpoint
router.post("/users/refreshToken", refreshTokenHandler);

// router.get ("/users/profileMentor", );

// router,get ("/users/mentorDetail", );

module.exports = router;

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
    path: "/profileUser/:id", Done
    element: <ProfileUser />,
  },
  {
    path: "/loginUser", Done
    element: <LoginUser />,
  },
  {
    path: "/registerUser", Done
    element: <RegisterUser />,
  },
]);
*/
