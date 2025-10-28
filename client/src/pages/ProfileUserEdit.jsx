import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import Footer from "../components/Fragments/Footer";
import ProfileInfoEdit from "../components/Fragments/ProfileInfoEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mentors from "../data/mentors";

const ProfileUserEdit = () => {
  let { id } = useParams();
  const mentor = useMemo(() => mentors.find((m) => m.id === parseInt(id)), [id]);
  const defaultForm = useMemo(
    () => ({ name: "", email: "", phone: "", about: "" }),
    []
  );
  const [formData, setFormData] = useState(mentor ? { ...mentor } : defaultForm);
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const res = await fetch("http://localhost:4000/users/profileUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data?.mentee) {
          setFormData({
            name: data.mentee.fullname || "",
            email: data.mentee.email || "",
            phone: data.mentee.phoneNumber || "",
            about: data.mentee.about || "",
          });
          if (data.mentee.profilePict) setImagePreview(data.mentee.profilePict);
        }
      } catch (_) {
        // ignore errors on load
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login first");
      return;
    }

    const fd = new FormData();
    if (file) fd.append("profilePict", file);
    fd.append("fullName", formData.fullName || formData.name || "");
    fd.append("email", formData.email || "");
    fd.append("phoneNumber", formData.phone || formData.phoneNumber || "");
    fd.append("about", formData.about || "");

    try {
      const res = await fetch("http://localhost:4000/users/editUserProfile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Profil berhasil diperbarui", { position: "bottom-right" });
        navigate(`/profileUser/${id}`);
      } else {
        toast.error(result.message || "Gagal memperbarui profil", { position: "bottom-right" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi masalah jaringan", { position: "bottom-right" });
    }
  };

  const handleCancel = () => {
    // pembatalan
    console.log("Edit canceled");
    setFormData(mentor ? { ...mentor } : defaultForm);
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
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(f);
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col font-poppins min-h-screen">
        <div className="w-full h-20 bg-gradient-to-r from-blue-900 to-sky-500"></div>
        <main className="px-6 md:px-20">
          <div className="flex flex-col md:flex-row md:justify-between md:gap-12 bg-white md:border md:border-gray-200 md:shadow-sm md:-mt-12 md:rounded-xl md:px-8">
            <div className="md:w-full flex flex-col md:flex-row justify-center md:items-center md:justify-between gap-4 px-8 md:px-24 py-4 -mt-12 md:mt-0 bg-white rounded-xl border border-gray-200 border-solid md:border-transparent shadow-sm md:shadow-none">
              <section className="md:w-1/3 flex flex-col gap-4 items-center">
                <label htmlFor="imageInput" className="cursor-pointer">
                  <div className="w-28 h-28 rounded-full overflow-hidden hover:opacity-60 transition-all">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile Photo" className="w-28" />
                    ) : (
                      <img
                        src="/images/photo-mentor-1.png"
                        alt="Profile Photo"
                        className=""
                      />
                    )}
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    name="profilePict"
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
                      form="editForm"
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
                id="editForm"
              >
                <div className="flex flex-col gap-2 px-4 py-2 mt-3 rounded-md border border-solid border-gray-200">
                  <ProfileInfoEdit
                    label={"Name"}
                    name={"name"}
                    value={formData.name}
                    placeholder={formData.name}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                  <ProfileInfoEdit
                    label={"Email"}
                    placeholder={formData.email}
                    name={"email"}
                    value={formData.email}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                  <ProfileInfoEdit
                    label={"Phone Number"}
                    placeholder={formData.phone}
                    name={"phone"}
                    value={formData.phone}
                    layout={"text-left"}
                    inputType={"text"}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2 px-4 py-2 rounded-md border border-solid border-gray-200">
                  <ProfileInfoEdit
                    label={"About Me"}
                    name={"about"}
                    placeholder={formData.about}
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
