import React from "react";

function EditBtn({ link }) {
  return (
    <a
      className="justify-center px-3 py-px font-medium whitespace-nowrap bg-gray-100 rounded-full text-sm md:text-base text-stone-900 text-opacity-80 cursor-pointer hover:bg-gray-300 transition-all"
      href={link}
    >
      Edit
    </a>
  );
}

export default EditBtn;
