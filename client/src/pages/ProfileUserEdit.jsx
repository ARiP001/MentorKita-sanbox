import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import ProfileInfoEdit from "../components/Fragments/ProfileInfoEdit";
import mentors from "../data/mentors";

const ProfileUserEdit = () => {
  let { id } = useParams();
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));
  const [formData, setFormData] = useState({ ...mentor });
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // pengiriman
    const updatedData = { ...formData, image: image || formData.image };
    console.log("Saved:", formData);
    alert("Profile updated successfully!");
    navigate("/profileUser/" + 1, { replace: true });
  };

  const handleCancel = () => {
    // pembatalan
    console.log("Edit canceled");
    setFormData({ ...mentor });
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="w-full h-20 bg-gradient-to-r from-blue-900 to-sky-500"></div>
        <main className="px-6 md:px-20">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-12 bg-white md:border md:border-gray-200 md:shadow-sm md:-mt-12 md:rounded-xl md:px-8">
            <div className="md:w-full flex flex-col md:flex-row justify-center md:items-center md:justify-between gap-4 px-8 md:px-24 py-4 -mt-12 md:mt-0 bg-white rounded-xl border border-gray-200 border-solid md:border-transparent shadow-sm md:shadow-none">
              <section className="md:w-1/3 flex flex-col gap-4 items-center">
                <label htmlFor="imageInput" className="cursor-pointer">
                  <div className="w-28 h-28 rounded-full overflow-hidden hover:opacity-60 transition-all">
                    {image ? (
                      <img src={image} alt="Profile Photo" className="w-28" />
                    ) : (
                      <img
                        src="../../../images/photo-mentor-1.png"
                        alt="Profile Photo"
                        className=""
                      />
                    )}
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <div className="text-center font-medium text-base md:text-lg">Edit Profile</div>
                <div className="hidden w-full md:block mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex justify-center items-center py-2.5 w-full text-xs md:text-sm font-semibold text-red-600 bg-white rounded-md border border-solid border-red-300 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex justify-center items-center py-2.5 w-full text-xs md:text-sm font-semibold text-blue-800 bg-white rounded-md border border-solid border-blue-300 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </section>
              <form
                className="md:w-3/5 flex flex-col gap-3 text-xs md:text-sm"
                onSubmit={handleSave}
              >
                <div className="flex flex-col gap-2 px-4 py-2 mt-3 rounded-md border border-solid border-gray-200">
                  <ProfileInfoEdit
                    label={"Name"}
                    value={formData.name}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                  <ProfileInfoEdit
                    label={"Email"}
                    value={formData.email}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                  <ProfileInfoEdit
                    label={"Phone Number"}
                    value={formData.phone}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
                  <ProfileInfoEdit
                    label={"About Me"}
                    value={formData.about}
                    layout={"text-center"}
                    inputType={"textarea"}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:hidden mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex justify-center items-center py-2.5 w-full text-xs md:text-sm font-semibold text-red-600 bg-white rounded-md border border-solid border-red-300 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex justify-center items-center py-2.5 w-full text-xs md:text-sm font-semibold text-blue-800 bg-white rounded-md border border-solid border-blue-300 cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileUserEdit;
