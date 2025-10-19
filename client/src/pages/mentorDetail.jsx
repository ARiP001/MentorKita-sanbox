// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import { useState } from "react";
import TitleH2 from "../components/Elements/titleH2";
import CardMentee from "../components/Fragments/CardMentee";
import mentors from "../data/mentors";
import { mentees } from "../data/mentees";
import GradientButton from "../components/Elements/Button/gradienButton";
import SkillsSection from "../components/Fragments/SkillsSection";
import ContactCard from "../components/Fragments/ContactCard";

const MentorDetail = () => {
  let { id } = useParams();
  // Filter mentor based on ID
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));

  const [isSaved, setIsSaved] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const toggleContactVisibility = () => {
    setIsContactVisible(!isContactVisible);
  };
  const onclick = () => {
    setIsSaved(!isSaved); // Toggle nilai state isSaved saat tombol diklik
  };

  return (
    <div >
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="flex-grow bg-white">
          <header className="w-full flex pl-5 pt-6 pb-1 bg-gradient-to-r from-[#081C87] to-[#27B2DD] md:h-36 lg:h-48 ">
            <section className="relative w-[45%] md:w-[75%] lg:w-[95%] ">
              <img
                src={mentor.photo}
                alt={`${mentor.name} photo`}
                className="absolute top-0 right-0 rounded-full border-4 border-white md:right-3 md:top-14 md:w-[158px]
                lg:right-5 lg:top-20 lg:w-[228px] xl:w-[260px]"
              />
            </section>
            <section className="w-full flex justify-between pr-2 pl-5 md:items-end md:justify-start md:gap-4 ">
              <div className="text-white pt-2 pb-1">
                <h2 className="text-base font-semibold lg:text-3xl">
                  {mentor.name}
                </h2>
                <p className="text-sm font-normal lg:text-xl">{mentor.work}</p>
              </div>
              <a
                href={mentor.linkedin}
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
                onClick={toggleContactVisibility}
              >
                <GradientButton>Contact Now</GradientButton>
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
                    ({mentor.reviewers} Reviews)
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
                    {mentor.location}
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
                    skills={mentor.course}
                    customClass={`bg-[#D4DBEC] text-textColor `}
                  />
                </div>
                <div>
                  <TitleH2 title="Skills" />
                  <SkillsSection
                    skills={mentor.skills}
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
              {mentor.experiences.map((experience, index) => {
                // setiap dapat "-" maka split menjadi value array baru
                const descriptionSplit = experience.description.split("-");
                return (
                  <div key={index}>
                    <h1 className="font-bold text-xs pr-4 text-textColor md:pr-0 ">
                      {experience.title}
                    </h1>
                    <div className=" ps-6">
                      <ol className="font-light text-[10px] text-justify text-textColor md:pr-0 lg:text-base ">
                        {descriptionSplit.map(
                          (item, i) =>
                            item.trim() !== "" && (
                              <li className="list-disc" key={i}>
                                {item.trim()}
                              </li>
                            )
                        )}
                      </ol>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* MENTEE OVERVIEW */}
            <section className="px-6 mt-12 mb-8 lg:flex lg:flex-col lg:items-center lg:mb-14">
              <TitleH2 title="Mentee Overview" />
              {mentees.map((mentee) => (
                <CardMentee key={mentee.id} mentee={mentee} />
              ))}
            </section>
            <section className="my-10">
              {isContactVisible && (
                <ContactCard
                  phone={mentor.phone}
                  location={mentor.location}
                  email={mentor.email}
                  courses={mentor.courses}
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
