import React, { useState, useEffect } from "react";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import CardMentor from "../components/Fragments/CardMentor";
import SearchBar from "../components/Fragments/SearchBar";
import FilterMentor from "../components/Fragments/FilterMentor";
import GradientButton from "../components/Elements/Button/gradienButton";
import RatingCheckbox from "../components/Fragments/RatingCheckbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Filter mentors based on search and filters
  const filterMentors = (searchTerm = searchValue, courses = selectedCourses, rating = selectedRating) => {
    let filtered = mentors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(mentor => 
        mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.job?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.courses?.some(course => 
          course.nama_course?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Course filter
    if (courses.length > 0) {
      filtered = filtered.filter(mentor =>
        mentor.courses?.some(course => 
          courses.includes(course.nama_course)
        )
      );
    }

    // Rating filter
    if (rating) {
      filtered = filtered.filter(mentor => 
        mentor.rating >= rating
      );
    }

    setFilteredMentors(filtered);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    filterMentors(searchTerm);
  };

  // Handle course filter change
  const handleCourseFilter = (courseValue, isChecked) => {
    if (isChecked) {
      setSelectedCourses([...selectedCourses, courseValue]);
    } else {
      setSelectedCourses(selectedCourses.filter(course => course !== courseValue));
    }
  };

  // Handle rating filter change
  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };

  // Fetch mentors from API
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/users/getAllMentors");
        const data = await response.json();
        
        if (response.ok) {
          setMentors(data.data);
          setFilteredMentors(data.data); // Initialize filtered mentors
        } else {
          setError(data.message);
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError("Failed to fetch mentors");
        toast.error("Failed to fetch mentors. Please check if server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // Re-filter when filters change
  useEffect(() => {
    filterMentors();
  }, [selectedCourses, selectedRating]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading mentors...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

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
                addComp={<RatingCheckbox onRatingChange={handleRatingFilter} selectedRating={selectedRating} />}
                onCourseChange={handleCourseFilter}
                selectedCourses={selectedCourses}
              />
            )}
            <SearchBar 
              onSearch={handleSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <div className="flex flex-col items-center mt-3 w-full text-xs font-medium">
            <h2 className="self-start text-xl md:text-2xl font-bold text-black mb-6">
              Recommended For You ({filteredMentors.length} mentors found)
            </h2>
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor, index) => (
                <CardMentor key={mentor.id || index} mentor={mentor} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No mentors found matching your criteria</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            )}
            <div className="self-center mt-6">
              <GradientButton>Show More</GradientButton>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}

export default SearchMentor;
