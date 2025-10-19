import React from "react";
import { useParams } from "react-router-dom";
import mentors from "../data/mentors";
import { mentees } from "../data/mentees";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import ProfileInfo from "../components/Fragments/ProfileInfo";
import Accordion from "../components/Fragments/Accordion";
import SkillsSection from "../components/Fragments/SkillsSection";
import FilterMentor from "../components/Fragments/FilterMentor";
import CourseCheckbox from "../components/Fragments/CourseCheckbox";
import LogoutBtn from "../components/Elements/Button/logoutBtn";
import CurrentCourseCard from "../components/Fragments/CurrentCourseCard";
import EditBtn from "../components/Elements/Button/editBtn";

const stats = [
  { value: 0, label: "Mentee" },
  { value: 2, label: "Course" },
  { value: 1, label: "Reviews" },
];

function Divider() {
  return <div className="border border-black border-solid aspect-[0.08]" />;
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="self-center text-xl md:text-2xl font-semibold">
        {value}
      </div>
      <div className="text-xs md:text-sm text-center">{label}</div>
    </div>
  );
}

function ProfileMentor() {
  let { id } = useParams();
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));

  return (
    <div className="flex flex-col font-poppins min-h-screen">
      <Navbar />
      <div className="w-full h-20 bg-gradient-to-r from-blue-900 to-sky-500"></div>
      <main className="flex-grow bg-white px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4 px-8 py-4 -mt-12 bg-white rounded-xl border border-gray-200 border-solid shadow-sm">
          <section className="md:w-1/4 flex flex-col gap-4 items-center">
            <img
              src="../../../images/photo-mentor-1.png"
              alt="Profile Photo"
              className="w-28"
            />
            <div className="text-center font-medium text-base md:text-lg">
              My Profile
            </div>
            <EditBtn link={"/profileMentor/edit/" + 1} />
            <div className="flex gap-4 items-center">
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <Stat {...stat} />
                  {index < stats.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
            <div className="hidden md:block w-full">
              <LogoutBtn />
            </div>
          </section>
          <section className="md:w-1/3 flex flex-col gap-3 text-xs md:text-sm">
            <div className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
              <ProfileInfo label={"Name"} value={mentor.name} />
              <ProfileInfo label={"Email"} value={mentor.email} />
              <ProfileInfo label={"Phone Number"} value={mentor.phone} />
            </div>
            <div className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
              <ProfileInfo label={"Job"} value={mentor.work} />
              <ProfileInfo label={"Location"} value={mentor.location} />
            </div>
            <div>
              <Accordion
                title={"Course"}
                content={<FilterMentor addClass={"mt-2"} />}
              />
              <SkillsSection
                skills={mentor.skills}
                customClass={`bg-[#D4DBEC] text-textColor`}
              />
            </div>
            <div>
              <Accordion title={"Skills"} content={<CourseCheckbox />} />
            </div>
          </section>
          <section className="md:w-1/3 flex flex-col gap-3 text-xs md:text-sm">
            <section className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
              <ProfileInfo label={"About Me"} value={mentor.about} />
            </section>
            <section className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
              <ProfileInfo label={"Experience"} value={mentor.experiences} />
            </section>
            <div className="md:hidden">
              <LogoutBtn />
            </div>
          </section>
        </div>
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between mt-7 w-full font-medium">
            <div className="text-base md:text-xl font-semibold">My Mentee</div>
            <a href="/courseMentor" className="text-sm md:text-base text-sky-500">Show more</a>
          </div>
          <div className="w-full py-5">
            {mentees.map((mentee) => (
              <CurrentCourseCard key={mentee.id} {...mentee} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfileMentor;
