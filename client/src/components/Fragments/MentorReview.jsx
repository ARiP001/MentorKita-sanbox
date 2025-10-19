import React, { useState } from "react";
import StarRating from "../Elements/starRating";
import TextareaForm from "../Elements/Input/textareaForm";
import SubmissionSuccess from "./SubmissionSuccess";

const MentorReview = ({ mentor, onClose }) => {
  const ratingInNumber = Number(mentor.rating);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", reviewText);
    
    setSubmitted(true);
    setReviewText("");
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleSubmissionSuccessClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 backdrop-blur-sm"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-80 p-4 rounded-xl bg-white shadow-2xl relative">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img
              loading="lazy"
              src={mentor.photo}
              alt={`${mentor.name} profile`}
              className="shrink-0 max-w-full aspect-square w-12 self-center"
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium">{mentor.name}'s Course</div>
              <StarRating rating={ratingInNumber} />
            </div>
          </div>
          <div className="self-center">
            <button onClick={() => onClose()}>
              <img
                src="../svg/exit.svg"
                alt=""
                className="hover:opacity-50 transition-all"
              />
            </button>
          </div>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <TextareaForm
              type={"text"}
              label={"Review"}
              placeholder={"Write a review ..."}
              name={"Review"}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              requiredStatus={true}
            />
            <button
              type="submit"
              className="w-20 px-4 py-1 mt-4 font-medium text-sm text-center text-white bg-sky-500 rounded-full hover:bg-sky-400 transition-all"
            >
              Submit
            </button>
          </form>
        ) : (
          <SubmissionSuccess
            onClose={handleSubmissionSuccessClose}
            statusChecked={1}
          />
        )}
      </div>
    </div>
  );
};

export default MentorReview;
