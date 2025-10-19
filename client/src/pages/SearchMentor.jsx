import React from "react";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import CardMentor from "../components/Fragments/CardMentor";
import SearchBar from "../components/Fragments/SearchBar";
import FilterMentor from "../components/Fragments/FilterMentor";
import GradientButton from "../components/Elements/Button/gradienButton";
import mentors from "../data/mentors";
import RatingCheckbox from "../components/Fragments/RatingCheckbox";

function SearchMentor() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar />
      <main className="flex flex-col font-poppins min-h-screen relative pt-4">
        <div className="flex-grow bg-white px-6 md:px-20">
          <div className="flex gap-5 justify-between py-5 text-sm bg-white text-neutral-400">
            <button type="button" onClick={toggleDropdown}>
              <img
                loading="lazy"
                src="../svg/filter-icon.svg"
                alt="Filter icon"
                className="shrink-0 my-auto aspect-square w-[33px] hover:opacity-60 transition-all"
              />
            </button>
            {isOpen && (
              <FilterMentor
                addClass={"absolute mt-12"}
                addComp={<RatingCheckbox />}
              />
            )}
            <SearchBar />
          </div>
          <div className="flex flex-col items-center mt-3 w-full text-xs font-medium">
            <h2 className="self-start text-xl md:text-2xl font-bold text-black">
              Recommended For You
            </h2>
            {mentors.map((mentor, index) => (
              <CardMentor key={index} mentor={mentor} />
            ))}
            <div className="self-center mt-6">
              <GradientButton>Show More</GradientButton>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SearchMentor;
