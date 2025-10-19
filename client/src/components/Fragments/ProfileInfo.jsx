import React from "react";

const ProfileInfo = ({ label, value, layout }) => (
  <div className="flex py-1 row flex-col gap-1 justify-between">
    <div className={`font-semibold text-stone-900 text-opacity-70 ${layout}`}>
      {label}
    </div>
    <div className="font-medium text-neutral-800 text-opacity-90 text-justify">
      {value}
    </div>
  </div>
);

export default ProfileInfo;
