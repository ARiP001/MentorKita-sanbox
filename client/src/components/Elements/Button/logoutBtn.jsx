import React from "react";

const LogoutBtn = () => {
  return (
    <div className="flex justify-center items-center py-2.5 w-full text-xs md:text-sm font-semibold text-red-700 bg-white rounded-md border border-solid border-red-200 cursor-pointer hover:bg-red-100 transition-all">
      <a href="#" className="flex gap-2 items-center">
        <div>Log Out</div>
        <img src="../svg/logout.svg" alt="Logout" />
      </a>
    </div>
  );
};

export default LogoutBtn;
