import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import ProfileInfo from "../components/Fragments/ProfileInfo";
import mentors from "../data/mentors";
import LogoutBtn from "../components/Elements/Button/logoutBtn";
import MyMentorCard from "../components/Fragments/MyMentorCard";
import RatingBadge from "../components/Fragments/RatingBadge";
import EditBtn from "../components/Elements/Button/editBtn";

const stats = [
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

const ProfileUser = () => {
  let { id } = useParams();
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));

  return (
    <div>
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="w-full h-20 bg-gradient-to-r from-blue-900 to-sky-500"></div>
        <main className="px-6 md:px-20">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-12 bg-white md:border md:border-gray-200 md:shadow-sm md:-mt-12 md:rounded-xl md:px-8">
            <div className="md:w-2/3 flex flex-col md:flex-row justify-center md:justify-between gap-4 px-8 md:px-0 py-4 -mt-12 md:mt-0 bg-white rounded-xl border border-gray-200 border-solid md:border-transparent shadow-sm md:shadow-none">
              <section className="md:w-1/3 flex flex-col gap-4 items-center">
                <img
                  src="../../../images/photo-mentor-1.png"
                  alt="Profile Photo"
                  className="w-28"
                />
                <div className="text-center font-medium text-base md:text-lg">
                  My Profile
                </div>
                <EditBtn link={"/profileUser/edit/" + 1} />
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
              <section className="md:w-3/5 flex flex-col gap-3 text-xs md:text-sm">
                <div className="flex flex-col gap-2 px-4 py-2 mt-3 rounded-md border border-solid border-gray-200">
                  <ProfileInfo label={"Name"} value={mentor.name} />
                  <ProfileInfo label={"Email"} value={mentor.email} />
                  <ProfileInfo label={"Phone Number"} value={mentor.phone} />
                </div>
                <div className="flex flex-col gap-2 px-4 py-2 text-xs md:text-sm rounded-md border border-solid border-gray-200">
                  <ProfileInfo label={"About Me"} value={mentor.about} />
                </div>
                <div className="md:hidden">
                  <LogoutBtn />
                </div>
              </section>
            </div>
            <section className="md:w-1/3">
              <div className="flex justify-between mt-7 w-full font-medium">
                <div className="text-base md:text-xl font-semibold">My Course</div>
                <a
                  href="/courseUser"
                  className="text-sm md:text-base text-sky-500 cursor-pointer hover:text-sky-300 transition-all"
                >
                  Show more
                </a>
              </div>
              <div className="w-full py-5">
                {mentors.map((mentor) => (
                  <MyMentorCard
                    key={mentor.id}
                    {...mentor}
                    ratingBadge={
                      <RatingBadge
                        rating={mentor.rating}
                        reviewers={mentor.reviewers}
                      />
                    }
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileUser;
