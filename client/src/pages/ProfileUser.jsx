import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import ProfileInfo from "../components/Fragments/ProfileInfo";
import mentors from "../data/mentors";
import LogoutBtn from "../components/Elements/Button/logoutBtn";
import MyMentorCard from "../components/Fragments/MyMentorCard";
import RatingBadge from "../components/Fragments/RatingBadge";
import EditBtn from "../components/Elements/Button/editBtn";
import { getUserId, getAuthToken } from "../utils/auth";
import MentorReview from "../components/Fragments/MentorReview";

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
  const loggedInId = getUserId();
  const [profile, setProfile] = useState(null);
  const [menteeMentorings, setMenteeMentorings] = useState([]);
  const [reviewFor, setReviewFor] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;
        const res = await fetch("http://localhost:4000/users/profileUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data?.mentee) setProfile(data.mentee);
      } catch (_) {
        // ignore errors for now
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchMenteeMentorings = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;
        const res = await fetch("http://localhost:4000/users/getMenteeMentorings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) setMenteeMentorings(data.data);
      } catch (_) {
        // ignore
      }
    };
    fetchMenteeMentorings();
  }, []);

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
                  src={profile?.profilePict || "../../../images/photo-mentor-1.png"}
                  alt="Profile Photo"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="text-center font-medium text-base md:text-lg">
                  My Profile
                </div>
                <EditBtn link={"/profileUser/edit/" + (loggedInId || id)} />
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
                  <ProfileInfo label={"Name"} value={profile?.fullname || mentor?.name || ""} />
                  <ProfileInfo label={"Email"} value={profile?.email || mentor?.email || ""} />
                  <ProfileInfo label={"Phone Number"} value={profile?.phoneNumber || mentor?.phone || ""} />
                </div>
                <div className="flex flex-col gap-2 px-4 py-2 text-xs md:text-sm rounded-md border border-solid border-gray-200">
                  <ProfileInfo label={"About Me"} value={profile?.about || mentor?.about || ""} />
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
                {menteeMentorings.length === 0 ? (
                  <p className="text-gray-500 text-sm">Belum ada aktivitas mentoring</p>
                ) : (
                  menteeMentorings.map((m) => (
                    <MyMentorCard
                      key={m.id}
                      name={m.mentorName || `Mentor #${m.mentorId}`}
                      status={m.status === 'DONE' ? 'Done' : m.status === 'ON_PROGRESS' ? 'On Progress' : 'Waiting'}
                      photo={m.mentorProfilePict || "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png"}
                      rating={"5"}
                      course={m.courseName || ""}
                      courseUser={m.mentorJob || m.courseName || ""}
                      ratingBadge={
                        <RatingBadge rating={5} reviewers={0} />
                      }
                      onAddReview={() => setReviewFor({ mentorId: m.mentorId, name: m.mentorName, photo: m.mentorProfilePict })}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
        {reviewFor && (
          <MentorReview
            mentor={{ name: reviewFor.name, photo: reviewFor.photo, rating: 5 }}
            mentorId={reviewFor.mentorId}
            onClose={() => setReviewFor(null)}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ProfileUser;
