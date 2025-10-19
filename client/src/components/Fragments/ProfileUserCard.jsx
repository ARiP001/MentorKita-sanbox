import React, { useState } from "react";

const stats = [
  { value: 0, label: "Mentee" },
  { value: 2, label: "Course" },
  { value: 1, label: "Reviews" },
];

function Divider() {
  return <div className="border border-white border-solid aspect-[0.06]" />;
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="self-center text-2xl font-semibold">{value}</div>
      <div className="text-xs text-center">{label}</div>
    </div>
  );
}

const ProfileUserCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <div className="absolute w-80 top-20 left-7 p-6 bg-primary text-white rounded-xl">
          <div className="flex justify-between">
            <div className="text-xl font-bold truncate">Michael</div>
            <button onClick={toggleVisibility}>
              <img src="../svg/double-arrow-white.svg" alt="" className="" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <img
              src="../../../images/photo-mentor-1.png"
              alt="Profile Photo"
              className="w-20"
            />
            <div className="flex gap-2 items-center">
              {stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <Stat {...stat} />
                  {index < stats.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileUserCard;
