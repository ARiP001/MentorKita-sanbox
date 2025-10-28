import React from "react";

const ProfileInfoEdit = ({ label, name, value, inputType, onChange, placeholder }) => (
  <div className="flex py-1 row flex-col gap-1 justify-between">
    <div className={`font-semibold text-stone-900 text-opacity-70 text-left`}>
      {label}
    </div>
    {inputType === "textarea" ? (
      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-100 rounded-lg p-2 h-32 font-medium text-neutral-800 border border-gray-300 focus:outline-none focus:border-sky-500"
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-100 rounded-lg p-2 font-medium text-neutral-800 border border-gray-300 focus:outline-none focus:border-sky-500"
      />
    )}
  </div>
);

export default ProfileInfoEdit;
