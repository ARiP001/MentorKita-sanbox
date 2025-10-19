import React from "react";

const ProfileInfoEdit = ({ label, value, inputType, onChange }) => (
  <div className="flex py-1 row flex-col gap-1 justify-between">
    <div className={`font-semibold text-stone-900 text-opacity-70 text-left`}>
      {label}
    </div>
    {inputType === "textarea" ? (
      <textarea
        defaultValue={value}
        onChange={onChange}
        className="bg-gray-100 rounded-lg p-2 h-32 font-medium text-neutral-800 border border-gray-300 focus:outline-none focus:border-sky-500"
      />
    ) : (
      <input
        type="text"
        defaultValue={value}
        onChange={onChange}
        className="bg-gray-100 rounded-lg p-2 font-medium text-neutral-800 border border-gray-300 focus:outline-none focus:border-sky-500"
      />
    )}
  </div>
);

export default ProfileInfoEdit;
