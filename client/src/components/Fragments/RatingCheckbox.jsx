import React from "react";
import ratings from "../../data/ratings";

const RatingCheck = ({ value, label }) => (
  <div className="flex gap-1.5 justify-center items-center">
    {" "}
    <input
      id={value}
      type="checkbox"
      name="rating"
      value={value}
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

const RatingCheckbox = () => {
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
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default RatingCheckbox;
