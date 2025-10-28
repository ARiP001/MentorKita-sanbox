import React from "react";
import { Link } from "react-router-dom";
import DetailBtn from "../Elements/Button/detailBtn";

const CardMentor = ({ mentor }) => {
  // Get profile picture from mentor.profilePict or mentor.mentee.profilePict
  const getProfilePicture = () => {
    if (mentor.profilePict) {
      return mentor.profilePict;
    }
    if (mentor.mentee && mentor.mentee.profilePict) {
      return mentor.mentee.profilePict;
    }
    return "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png";
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 mb-6">
      <div className="flex gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={getProfilePicture()}
            alt={`${mentor.fullName} profile`}
            className="w-24 h-24 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = "https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png";
            }}
          />
        </div>
        
        {/* Mentor Info */}
        <div className="flex-grow">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-900">{mentor.fullName}</h3>
            <p className="text-sm text-gray-600">{mentor.job}</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              {mentor.rating || 0}({mentor.reviewers || 0} Reviews)
            </span>
          </div>
          
          {/* Courses/Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.courses && mentor.courses.map((course, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {course.nama_course}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {mentor.about || "No description available"}
          </p>
          
          {/* Detail Button */}
          <div className="flex justify-center">
            <Link to={`/mentorDetail/${mentor.id}`}>
              <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                Detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMentor;
