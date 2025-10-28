// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import { useState, useEffect } from "react";
import TitleH2 from "../components/Elements/titleH2";
import GradientButton from "../components/Elements/Button/gradienButton";
import SkillsSection from "../components/Fragments/SkillsSection";
import ContactCard from "../components/Fragments/ContactCard";
import { getMentorDetail } from "../service/mentor.service";
import { isAuthenticated } from "../utils/auth";

const MentorDetail = () => {
  let { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchMentorDetail = async () => {
      try {
        await getMentorDetail(id, (success, response) => {
          if (success) {
            console.log("Mentor data received:", response.data.data);
            console.log("Komentars:", response.data.data.komentars);
            setMentor(response.data.data);
            setLoading(false);
          } else {
            setError(response.response?.data?.message || "Failed to fetch mentor details");
            setLoading(false);
          }
        });
      } catch (err) {
        setError("An error occurred while fetching mentor details");
        setLoading(false);
      }
    };

    fetchMentorDetail();
  }, [id]);

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(isAuthenticated());
  }, []);

  const toggleContactVisibility = () => {
    setIsContactVisible(!isContactVisible);
  };

  const handleContactClick = () => {
    if (isLoggedIn) {
      setIsContactVisible(true);
    } else {
      // Redirect to login page
      window.location.href = "/loginUser";
    }
  };

  const onclick = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="flex flex-col font-poppins min-h-screen">
        <Navbar />
        <div className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#081C87] mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading mentor details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col font-poppins min-h-screen">
        <Navbar />
        <div className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#081C87] text-white rounded hover:bg-[#0a1f9e]"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="flex flex-col font-poppins min-h-screen">
        <Navbar />
        <div className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Mentor not found</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div >
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="flex-grow bg-white">
          <header className="w-full flex pl-5 pt-6 pb-1 bg-gradient-to-r from-[#081C87] to-[#27B2DD] md:h-36 lg:h-48 ">
            <section className="relative w-[45%] md:w-[75%] lg:w-[95%] ">
              <img
                src={mentor.mentee?.profilePict || "../../../images/mentor-photo-1.png"}
                alt={`${mentor.fullName} photo`}
                className="absolute top-0 right-0 rounded-full border-4 border-white md:right-3 md:top-14 md:w-[158px] md:h-[158px]
                lg:right-5 lg:top-20 lg:w-[228px] lg:h-[228px] xl:w-[260px] xl:h-[260px] object-cover"
              />
            </section>
            <section className="w-full flex justify-between pr-2 pl-5 md:items-end md:justify-start md:gap-4 ">
              <div className="text-white pt-2 pb-1">
                <h2 className="text-base font-semibold lg:text-3xl">
                  {mentor.fullName}
                </h2>
                <p className="text-sm font-normal lg:text-xl">{mentor.job}</p>
              </div>
              <a
                href="#"
                className="flex items-end pb-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="../../../svg/linkedin.svg"
                  alt="Linkedin icon"
                  className="lg:w-[28px]"
                />
              </a>
            </section>
          </header>
          <main className="flex-grow bg-white md:px-24 lg:px-[180px]">
            {/* BUTTON CONTACT NOW */}
            <section className="flex text-right mt-4 lg:mt-8 ">
              <div className="w-[52%] md:w-[72%] lg:w-[98%] "></div>
              <div
                className="w-full flex justify-start pl-4 "
                onClick={handleContactClick}
              >
                <GradientButton 
                  customClass={!isLoggedIn ? "opacity-75 cursor-pointer" : ""}
                >
                  {isLoggedIn ? "Contact Now" : "Login to Contact"}
                </GradientButton>
              </div>
            </section>

            {/* BAGIAN RATING LOKASI DAN SAVE */}
            <section className="md:flex md:gap-4 lg:mt-28 lg:pr-6 lg:justify-start lg:gap-20">
              <div className=" mt-8 px-6 md:mt-14">
                {/* rating */}
                <div className="flex gap-1 items-center">
                  <img
                    src="../../../svg/star.svg"
                    alt="Star icon"
                    className="lg:w-[28px]"
                  />
                  <p className="text-sm font-semibold text-textColor ps-1 lg:text-lg">
                    {mentor.rating}
                  </p>
                  <p className="text-sm font-semibold text-textColor lg:text-lg">
                    ({mentor.komentars?.length || 0} Reviews)
                  </p>
                </div>
                {/* location */}
                <div className="flex gap-1 items-center mt-2">
                  <img
                    src="../../../images/location.png"
                    alt="Location icon"
                    className="lg:w-[28px]"
                  />
                  <p className="text-sm font-semibold text-textColor ps-[3px] lg:text-lg">
                    {mentor.lokasi}
                  </p>
                </div>
                {/* save/bookmark mentor */}
                {/* <div className="flex gap-1 items-center mt-2">
                  <img
                    src={
                      isSaved
                        ? "../../../svg/save-fill.svg"
                        : "../../../svg/save.svg"
                    }
                    alt="Save icon"
                    id="save"
                    className={`${
                      isSaved ? "ps-[2px]" : "ps-[5px]"
                    } cursor-pointer lg:w-[26px] `}
                    onClick={onclick} // Memanggil fungsi onclick saat tombol diklik
                  />
                  <p className="text-sm font-semibold text-textColor ps-[7px] lg:text-lg">
                    Save
                  </p>
                </div> */}
              </div>
              {/* SKILLS */}
              <div className="px-6 md:px-0 md:mt-8">
                <div>
                  <TitleH2 title="Courses" />
                  <SkillsSection
                    skills={mentor.courses?.map(course => course.nama_course) || []}
                    customClass={`bg-[#D4DBEC] text-textColor `}
                  />
                </div>
                <div>
                  <TitleH2 title="Skills" />
                  <SkillsSection
                    skills={mentor.skills?.map(skill => skill.nama_skills) || []}
                    customClass={`bg-[#081C87] text-white`}
                  />
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section className="px-6 mt-10">
              <TitleH2 title="About" />
              <p className="font-light text-xs pr-4 text-textColor md:pr-0 lg:text-base">
                {mentor.about}
              </p>
            </section>

            {/* EXPERIENCES */}
            <section className="px-6 mt-10">
              <TitleH2 title="Experiences" />
              {mentor.experiences?.length > 0 ? (
                (() => {
                  // Group experiences by year
                  const experiencesByYear = mentor.experiences.reduce((acc, experience) => {
                    const year = experience.year;
                    if (!acc[year]) {
                      acc[year] = [];
                    }
                    acc[year].push(experience);
                    return acc;
                  }, {});

                  // Sort years in descending order
                  const sortedYears = Object.keys(experiencesByYear).sort((a, b) => b - a);

                  return sortedYears.map((year) => (
                    <div key={year} className="mb-6">
                      <h1 className="font-bold text-sm pr-4 text-textColor md:pr-0 lg:text-lg mb-3">
                        {year}
                      </h1>
                      <div className="pl-4">
                        {experiencesByYear[year].map((experience, index) => (
                          <div key={index} className="mb-4">
                            <h2 className="font-semibold text-xs pr-4 text-textColor md:pr-0 lg:text-sm mb-2">
                              {experience.title}
                            </h2>
                            <div className="pl-4">
                              <p className="font-light text-[10px] text-justify text-textColor md:pr-0 lg:text-sm leading-relaxed">
                                {experience.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()
              ) : (
                <p className="text-gray-500">No experiences available</p>
              )}
            </section>

            {/* COMMENTS/REVIEWS */}
            <section className="px-6 mt-12 mb-8 lg:flex lg:flex-col lg:items-center lg:mb-14">
              <TitleH2 title="Reviews" />
              {mentor.komentars?.length > 0 ? (
                <div className="w-full max-w-4xl space-y-4">
                  {mentor.komentars.map((comment) => (
                    <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-4">
                        <img
                          src={comment.mentee?.profilePict || "../../../images/mentor-photo-1.png"}
                          alt={`${comment.mentee?.fullName} profile`}
                          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">
                              {comment.mentee?.fullName || "Anonymous"}
                            </h4>
                            <div className="flex items-center text-yellow-500">
                              <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                              <span className="text-sm font-medium">5.0</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Be the first to share your experience with this mentor!</p>
                </div>
              )}
            </section>
            <section className="my-10">
              {isContactVisible && (
              <ContactCard
                mentorId={mentor.id}
                phone={mentor.phoneNumber}
                location={mentor.lokasi}
                email={mentor.email}
                courses={mentor.courses?.map(course => ({
                  value: course.id,
                  label: course.nama_course
                })) || []}
                onClose={() => setIsContactVisible(false)}
              />
            )}
            </section>
          </main>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MentorDetail;
