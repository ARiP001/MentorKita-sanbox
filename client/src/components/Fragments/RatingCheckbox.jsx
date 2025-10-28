import React from "react";
import ratings from "../../data/ratings";

const RatingCheck = ({ value, label, checked, onChange }) => (
  <div className="flex gap-1.5 justify-center items-center">
    {" "}
    <input
      id={value}
      type="radio"
      name="rating"
      value={value}
      checked={checked}
      onChange={onChange}
      className="box-border flex relative flex-col shrink-0 p-2.5 rounded border border-solid border-stone-300"
    />{" "}
    <label htmlFor={value} className="box-border flex relative shrink-0 gap-1">
      {" "}
      <p>{label}</p>{" "}
      <img
        loading="lazy"
        src="../svg/rating-star.svg"
        alt="Star icon"
        className="shrink-0 self-stretch my-auto aspect-square w-3"
      />{" "}
    </label>{" "}
  </div>
);

const RatingCheckbox = ({ onRatingChange, selectedRating }) => {
  const handleRatingChange = (e) => {
    const rating = parseFloat(e.target.value);
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  return (
    <div>
      <h2 className="mt-4 text-base font-semibold">Rating</h2>{" "}
      <div className="flex gap-5 justify-between py-1">
        {" "}
        {ratings.map((rating) => (
          <RatingCheck
            key={rating}
            value={rating}
            label={rating.toString()}
            checked={selectedRating === rating}
            onChange={handleRatingChange}
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default RatingCheckbox;
