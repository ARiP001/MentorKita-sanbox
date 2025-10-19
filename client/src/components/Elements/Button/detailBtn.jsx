import React from "react";

function DetailBtn() {
  return (
    <a href="/mentorDetail/1" className="max-w-md md:max-w-[16rem] mt-3 flex justify-center md:justify-start">
      <button
        type="button"
        className="w-full h-8 text-xs md:text-sm font-normal text-center text-white bg-primary hover:bg-opacity-80 transition-all rounded-md"
      >
        Detail
      </button>
    </a>
  );
}

export default DetailBtn;
