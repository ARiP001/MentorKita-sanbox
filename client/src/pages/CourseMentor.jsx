import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import TitleH2 from "../components/Elements/titleH2";
// import { alumniMentees } from "../data/mentees";
import CurrentCourseCard from "../components/Fragments/CurrentCourseCard";
import CardMentee from "../components/Fragments/CardMentee";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthToken } from "../utils/auth";

const CourseMentor = () => {
  const [currentRequests, setCurrentRequests] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchMentorRequests = async () => {
      try {
        const token = getAuthToken();
        if (!token) return setLoading(false);
        const res = await fetch("http://localhost:4000/users/getMentorMentorings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) {
          setCurrentRequests(data.data);
        }
      } catch (_) {
        // ignore errors for now
      } finally {
        setLoading(false);
      }
    };
    fetchMentorRequests();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = getAuthToken();
        if (!token) return setLoadingComments(false);
        const res = await fetch("http://localhost:4000/users/getMentorComments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) setComments(data.data);
      } catch (_) {
        // ignore
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:4000/users/mentoring/${id}/accept`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        toast.success('Request accepted', { position: 'bottom-right' });
        setCurrentRequests((prev) => prev.map(r => r.id === id ? { ...r, status: 'ON_PROGRESS' } : r));
      } else {
        toast.error(result.message || 'Failed to accept', { position: 'bottom-right' });
      }
    } catch (_) {
      toast.error('Network error', { position: 'bottom-right' });
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`http://localhost:4000/users/mentoring/${id}/complete`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        toast.success('Marked as done', { position: 'bottom-right' });
        setCurrentRequests((prev) => prev.map(r => r.id === id ? { ...r, status: 'DONE' } : r));
      } else {
        toast.error(result.message || 'Failed to complete', { position: 'bottom-right' });
      }
    } catch (_) {
      toast.error('Network error', { position: 'bottom-right' });
    }
  };

  return (
    <div >
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
      <div className="w-full h-[84px] flex pl-5 pt-6 pb-1 bg-gradient-to-r from-[#081C87] to-[#27B2DD] md:hidden"></div>
      <main className="relative z-10 flex-grow bg-white md:px-20 lg:flex lg:justify-start lg:gap-28">
        <section
          className="absolute z-10 left-2 -top-14  w-[95.6%] flex flex-col items-center rounded-[10px] bg-white border border-[#BDBDBD]
        md:px-20 md:relative md:mt-20 lg:w-[50%] lg:static lg:mt-10 lg:px-28 lg:min-h-[720px]"
        >
          <TitleH2 title="List Mentoring" />
          {/* rating */}
          <div className="flex gap-1 items-center text-xs mt-6 mb-7">
            <img
              src="../../../svg/yellow-star.svg"
              alt="Star icon"
              className="w-5 h-5 lg:w-8 lg:h-8"
            />
            <p className="font-semibold text-textColor ps-1 lg:text-xl">5.0</p>
            <p className="font-normal text-textColor lg:text-xl">(196 Reviews)</p>
          </div>

          <div className="w-full px-5 pb-12">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : currentRequests.length === 0 ? (
              <p className="text-center text-gray-500">Belum ada permintaan</p>
            ) : (
              currentRequests.map((req) => {
                const normalized = req.status === 'WAITING' ? 'Waiting' : req.status === 'ON_PROGRESS' ? 'On Progress' : req.status;
                const actionLabel = normalized === 'Waiting' ? 'Accept' : normalized === 'On Progress' ? 'Complete' : null;
                const onAction = normalized === 'Waiting' ? handleAccept : normalized === 'On Progress' ? handleComplete : null;
                return (
                  <CurrentCourseCard
                    key={req.id}
                    id={req.id}
                    name={req.menteeName || `Mentee #${req.menteeId}`}
                    status={normalized}
                    image={req.menteeProfilePict || "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png"}
                    actionLabel={actionLabel}
                    onAction={onAction}
                  />
                );
              })
            )}
          </div>
        </section>
        <section
          className="mt-[520px] flex flex-col items-center px-9 mb-60 md:-mt-7
        lg:mt-10 lg:px-0"
        >
          <TitleH2 title="Mentee Overview" />
          {/* mentee overview from BE comments */}
          {loadingComments ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada komentar</p>
          ) : (
            comments.map((c) => (
              <CardMentee
                key={c.id}
                mentee={{
                  id: c.mentee?.id,
                  name: c.mentee?.fullName || `Mentee #${c.mentee?.id}`,
                  image: c.mentee?.profilePict || "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png",
                  rating: 5,
                  comment: c.body,
                  alumniCourse: "",
                }}
              />
            ))
          )}
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </div>
  );
};

export default CourseMentor;
