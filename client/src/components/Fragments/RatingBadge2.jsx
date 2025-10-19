import React from 'react'

const RatingBadge2 = ({rating, reviewers}) => {
  return (
    <div className="flex gap-1 text-xs md:text-sm">
      <img
        loading="lazy"
        src="../svg/rating-star.svg"
        alt="Star icon"
        className="shrink-0 aspect-square fill-yellow-400 w-3"
      />
      <div className="text-[10x] text-textColor">
        <span className="font-semibold">{rating}</span>
        <span className="font-normal">{`(${reviewers} Reviews)`}</span>
      </div>
    </div>
  )
}

export default RatingBadge2