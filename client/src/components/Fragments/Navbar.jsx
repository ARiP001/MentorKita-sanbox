import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { isAuthenticated, logout, getUserRole } from '../../utils/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
      setUserRole(getUserRole());
    };
    
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <>
      <div className="bg-white flex flex-row justify-between h-[50px] bg-gradient-to-r from-[#081C87] to-[#27B2DD] fixed top-0 w-full z-20 lg:h-[67px] md:h-[60px]">
        <p className="text-black py-[15px] px-[15px] mr-auto lg:px-0 lg:z-30 lg:pt-[20px] lg:mr-[245px]">
          <img className="size-5 lg:w-[32px] lg:h-[24px] lg:border lg:border-black lg:ml-[25px]" src="../../../public/images/Logo.png" alt="Logo" />
        </p>
        <ul className="flex md:flex-row lg:flex-row lg:w-[700px] lg:ml-[25px]">
          <li className="hover:text-[#081C87] hover:border-b-4 hover:border-[#081C87] border-b hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[200px] lg:text-[20px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[150px] md:text-[20px] md:leading-[30px] md:pt-[15px] md:text-center">
            <Link to="/"> Dashboard </Link>
          </li>
          <li className="hover:text-[#081C87] hover:border-b-4 hover:border-[#081C87] border-b hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[200px] lg:text-[20px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[150px] md:text-[20px] md:leading-[30px] md:pt-[15px] md:text-center">
            <Link to="/searchMentor"> Search Mentors </Link>
          </li>
          <li className="hover:text-[#081C87] hover:border-b-4 hover:border-[#081C87] border-b hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[200px] lg:text-[20px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[150px] md:text-[20px] md:leading-[30px] md:pt-[15px] md:text-center">
            <Link to="/becomeAMentor"> Be a Mentor </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[150px] lg:text-[20px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[100px] md:text-[20px] md:leading-[30px] md:pt-[15px] md:text-center">
                <img className="w-[50px] h-[50px] bg-gray-300 rounded-full" src="https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png" alt="" />
              </li>
              <li className="hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[100px] lg:text-[16px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[80px] md:text-[16px] md:leading-[30px] md:pt-[15px] md:text-center">
                <button onClick={handleLogout} className="hover:text-red-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="hover:text-[#081C87] hover:border-b-4 hover:border-[#081C87] border-b hidden md:block lg:block lg:text-white lg:font-semibold lg:w-[150px] lg:text-[20px] lg:leading-[30px] lg:pt-[15px] lg:text-center md:text-white md:font-semibold md:w-[100px] md:text-[20px] md:leading-[30px] md:pt-[15px] md:text-center">
              <Link to="/loginUser"> Log In</Link>
            </li>
          )}
        </ul>
        <button onClick={toggleMenu} className="block lg:ml-[910px] md:hidden mr-6">
          <p className="text-black p-[10px]">
            <img className="size-5 p-[3px] bg-white rounded" src="../../../public/images/Vector.png" alt="Menu" />
          </p>
        </button>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} w-[180px] h-[400px] bg-white ml-48 border-2 rounded-lg fixed z-20 lg:ml-[1100px] md:hidden`}>
        <nav className="w-[180px] h-[170px]">
          <ul className="flex flex-col">
            <li className="text-black text-base px-[40px] py-[30px] font-semibold mx-auto">
              <a href="#">
                <img className="mt-7 mx-auto w-[90px] bg-gray-300 rounded-full" src="https://cdn1.iconfinder.com/data/icons/basic-ui-set-v5-user-outline/64/Account_profile_user_avatar_rounded-512.png" alt="User Avatar" />
              </a>
            </li>
            <li className="text-black text-base px-[25px] py-[10px] font-semibold">
              <Link to="/"> Dashboard </Link>
            </li>
            <li className="text-black text-base px-[25px] py-[10px] font-semibold">
              <Link to="/searchMentor"> Search Mentors </Link>
            </li>
            <li className="text-black text-base px-[25px] py-[10px] font-semibold">
              <Link to="/becomeAMentor"> Be a Mentor </Link>
            </li>
            {isLoggedIn ? (
              <li className="text-[#081C87] text-base px-[25px] py-[10px] font-semibold">
                <button onClick={handleLogout} className="hover:text-red-500">
                  Logout
                </button>
              </li>
            ) : (
              <li className="text-[#081C87] text-base px-[25px] py-[10px] font-semibold">
                <Link to="/loginUser"> Log In</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="mb-[50px]"></div>
    </>
  );
}

export default Navbar;
