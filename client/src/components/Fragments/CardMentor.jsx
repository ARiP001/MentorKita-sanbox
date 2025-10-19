import React from "react";
import RatingBadge from "./RatingBadge";
import DetailBtn from "../Elements/Button/detailBtn";
import SkillsSection from "./SkillsSection";
import RatingBadge2 from "./RatingBadge2";

const CardMentor = ({ mentor }) => {
  return (
    <div className="flex flex-col flex-wrap md:gap-2 justify-center content-center px-5 py-3 mt-7 max-w-3xl bg-white hover:bg-gray-50 transition-all rounded-md shadow-xl">
      <div className="flex gap-5">
        <div className="md:hidden relative">
          <RatingBadge rating={mentor.rating} reviewers={mentor.reviewers} />
        </div>
        <img
          loading="lazy"
          src={mentor.photo}
          alt={`${mentor.name} profile`}
          className="shrink-0 max-w-full aspect-square w-28 self-center"
        />
        <div className="flex flex-col py-1 md:justify-between">
          <div className="flex flex-col">
            <div className="text-base md:text-lg font-semibold">{mentor.name}</div>
            <div className="text-xs md:text-sm font-normal">{mentor.work}</div>
          </div>
          <div className="hidden md:block">
            <RatingBadge2 rating={mentor.rating} reviewers={mentor.reviewers} />
          </div>
          <SkillsSection
            skills={mentor.skills}
            customClass={`bg-[#D4DBEC] text-textColor`}
          />
        </div>
      </div>
      <div className="mt-3 text-justify text-black font-normal text-[8px] md:text-sm leading-3">
        {mentor.about}
      </div>
      <DetailBtn />
    </div>
  );
};

export default CardMentor;
