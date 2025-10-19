import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import TitleH2 from "../components/Elements/titleH2";
import mentors from "../data/mentors";
import MyMentorCard from "../components/Fragments/MyMentorCard";

const CourseUser = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="w-full h-[84px] flex pl-5 pt-6 pb-1 bg-gradient-to-r from-[#081C87] to-[#27B2DD] md:hidden"></div>
        <main className="relative z-10 flex-grow bg-white md:px-20 lg:px-44">
          <section
            className="absolute z-10 left-2 -top-14  w-[95.6%] flex flex-col items-center rounded-[10px] bg-white border
          border-[#BDBDBD] md:static md:mt-10 md:px-20 lg:px-64
        "
          >
            <TitleH2 title="My Course" />
            <div className="w-full px-5 pb-10 mt-8">
              {/* courseUser nanti di buatin variabel yang ngambil data cour user dari data user, untuk sekarang masih constant/declarative */}
              {/* my mentor */}
              {mentors.map((mentor) => (
                <MyMentorCard key={mentor.id} courseUser={`Web Development`} {...mentor} />
              ))}
            </div>
          </section>
          {/* section ini biar footer ada jarak dengan card */}
          <section className="mt-[520px] flex flex-col items-center px-9 mb-60"></section>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default CourseUser;
