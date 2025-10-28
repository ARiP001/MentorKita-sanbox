import React, { useState } from "react";
import PropTypes from "prop-types";
import StarRating from "../Elements/starRating";
import MentorReview from "./MentorReview";
import mentors from "../../data/mentors";

const MyMentorCard = ({
  name,
  status,
  photo,
  rating,
  course,
  ratingBadge,
  courseUser,
  onAddReview,
}) => {
  const ratingInNumber = Number(rating);
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const toggleReviewVisibility = () => {
    setIsReviewVisible(!isReviewVisible);
  };

  return (
    <main
      className={`font-poppins mb-4 w-full shadow-cardShadow py-[10px] px-5 rounded-lg bg-[#ECF1FF] ${
        status === "not my mentor" ? "hidden" : "block"
      }`}
    >
      <section className="flex gap-6 py-2">
        {/* photo */}
        <div className="relative flex">
          {ratingBadge}
          <img
            src={photo}
            alt={name}
            className="rounded-[10px] w-[100px] object-cover self-center lg:w-[140px]"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 text-left">
          {/* nama */}
          <p className="text-base font-bold lg:text-2xl">{name}</p>
          {/* course */}
          <p className="text-[10px] font-normal mb-1 lg:text-lg">
            {courseUser}
          </p>
          {/* Rating */}
          <div className="h-4 mb-2">
            <div className={` ${status === "Done" ? "block" : "hidden"}`}>
              <StarRating rating={ratingInNumber} />
            </div>
          </div>
          {/* status */}
          <div
            className={`${
              status === "Done" ? "hover:bg-[#081C87]" : "hover:bg-[#27B2DD]"
            }
            bg-[#081C87] text-white text-base font-bold w-36 py-2 text-center rounded-[10px] duration-300 lg:px-28 lg:flex lg:justify-center`}
            onClick={toggleReviewVisibility}
          >
            {status}
          </div>
          {status === "Done" && (
            <button
              type="button"
              onClick={onAddReview}
              className="mt-2 bg-[#27B2DD] hover:bg-[#1aa7d5] text-white text-sm font-semibold py-2 px-4 rounded-[10px] w-36"
            >
              Add Review
            </button>
          )}
          {isReviewVisible && status === "Review" && (
            <MentorReview
              mentor={mentors.find((mentor) => mentor.status === "Review")}
              onClose={() => setIsReviewVisible(false)}
            />
          )}
        </div>
      </section>
    </main>
  );
};

MyMentorCard.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  photo: PropTypes.string,
  rating: PropTypes.string,
  course: PropTypes.string,
  ratingBadge: PropTypes.string,
  courseUser: PropTypes.string,
};

export default MyMentorCard;
