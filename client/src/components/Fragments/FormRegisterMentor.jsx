import { useState } from "react";
import InputForm from "../Elements/Input/inputForm";
import TextareaForm from "../Elements/Input/textareaForm";
import CheckBoxForm from "../Elements/Input/checkboxForm";
import Accordion from "./Accordion";
import DisplaySkills from "./DisplaySkills";
import skills from "../../data/skills";
import courses from "../../data/courses";
import DarkBlueButton from "../Elements/Button/darkBlueButton";
import TitleH2 from "../Elements/titleH2";
import SubmissionSuccess from "./SubmissionSuccess";
import { becomeAMentor } from "../../service/becomeAMentor.service";
import { isAuthenticated } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormRegisterMentor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    job: "",
    lokasi: "",
    about: "",
    rating: 4.5, // Default rating
  });
  
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "",
      detail: "",
      year: new Date().getFullYear(),
    }
  ]);
  
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error("You must be logged in to become a mentor");
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data for backend
      const mentorData = {
        ...formData,
        experiences: experiences.map(exp => ({
          year: exp.year,
          title: exp.title,
          detail: exp.detail,
        })),
        courses: selectedCourses,
        skills: selectedSkills,
      };

      await becomeAMentor(mentorData, (success, response) => {
        if (success) {
          toast.success("Successfully registered as a mentor!");
          setSubmitted(true);
        } else {
          const errorMessage = response.response?.data?.message || response.message || "Failed to register as mentor";
          toast.error(errorMessage);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
      setLoading(false);
    }
  };
  const handleSubmissionSuccessClose = () => {
    setSubmitted(false);
    // Redirect to home page (Dashboard)
    window.location.href = "/";
  };

  // Handle form data changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle multiple experiences
  const handleExperienceChangeMultiple = (index, field, value) => {
    setExperiences(prev => prev.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const addExperience = () => {
    const newId = Math.max(...experiences.map(exp => exp.id), 0) + 1;
    setExperiences(prev => [...prev, {
      id: newId,
      title: "",
      detail: "",
      year: new Date().getFullYear(),
    }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      setExperiences(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSkillChange = (event) => {
    const skillValue = event.target.value;
    if (event.target.checked) {
      setSelectedSkills([...selectedSkills, skillValue]);
    } else {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== skillValue));
    }
  };

  const handleCourseChange = (event) => {
    const courseValue = event.target.value;
    if (event.target.checked) {
      setSelectedCourses([...selectedCourses, courseValue]);
    } else {
      setSelectedCourses(
        selectedCourses.filter((course) => course !== courseValue)
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Validate required fields
    if (!formData.fullName.trim()) {
      toast.error("Name is required");
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Phone number is required");
      isValid = false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\w{2,}$/.test(formData.email)) {
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (!formData.job.trim()) {
      toast.error("Job is required");
      isValid = false;
    }

    if (!formData.lokasi.trim()) {
      toast.error("Location is required");
      isValid = false;
    }

    if (!formData.about.trim()) {
      toast.error("About section is required");
      isValid = false;
    }

    // Validate experiences
    if (experiences.length === 0) {
      toast.error("Please add at least one experience");
      isValid = false;
    } else {
      experiences.forEach((exp, index) => {
        if (!exp.title.trim()) {
          toast.error(`Experience ${index + 1} title is required`);
          isValid = false;
        }
        if (!exp.detail.trim()) {
          toast.error(`Experience ${index + 1} detail is required`);
          isValid = false;
        }
      });
    }

    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      isValid = false;
    }

    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      isValid = false;
    }

    return isValid;
  };

  return (
    <form onSubmit={handleFormSubmit} className="font-poppins">
      {/* Nama */}
      <section className="mb-8">
        <InputForm
          type="text"
          label="Name"
          placeholder="Your Name"
          name="fullName"
          requiredStatus={true}
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />
      </section>
      {/* no telepon */}
      <section className="mb-8">
        <InputForm
          type="tel"
          label="Phone"
          placeholder="e.g. 0822xxxxxxxx"
          name="phoneNumber"
          requiredStatus={true}
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />
        {phoneError && <div className="text-red-500">{phoneError}</div>}
      </section>
      {/* email */}
      <section className="mb-8">
        <InputForm
          type="email"
          label="Email"
          placeholder="e.g. example@gmail.com"
          name="email"
          requiredStatus={true}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {emailError && <div className="text-red-500">{emailError}</div>}
      </section>
      {/* job */}
      <section className="mb-8">
        <InputForm
          type="text"
          label="Job"
          placeholder="Your Job"
          name="job"
          requiredStatus={true}
          value={formData.job}
          onChange={(e) => handleInputChange("job", e.target.value)}
        />
      </section>
      {/* location */}
      <section className="mb-8">
        <InputForm
          type="text"
          label="Location"
          placeholder="Your Location"
          name="lokasi"
          requiredStatus={true}
          value={formData.lokasi}
          onChange={(e) => handleInputChange("lokasi", e.target.value)}
        />
      </section>
      {/* choose course */}
      <section className="mb-8">
        <Accordion
          title={"Choose Course"}
          content={
            <div className="my-2 pl-1 pr-4">
              <div className="bg-gray-200 py-2 px-4 rounded-lg">
                {courses.map((skill) => (
                  <CheckBoxForm
                    key={skill.value}
                    object={skill}
                    handleObjectChange={handleCourseChange}
                    selectedObject={selectedCourses}
                  />
                ))}
              </div>
            </div>
          }
        />
        <DisplaySkills
          customClass={`bg-[#D4DBEC] text-textColor`}
          skills={selectedCourses.map((value) => ({ value, label: value }))}
        />
      </section>
      {/* choose skills */}
      <section className="mb-8">
        <Accordion
          title={"Choose Skills"}
          content={
            <div className="my-2 pl-1 pr-4">
              <div className="bg-gray-200 py-2 px-4 rounded-lg">
                {skills.map((skill) => (
                  <CheckBoxForm
                    key={skill.value}
                    object={skill}
                    handleObjectChange={handleSkillChange}
                    selectedObject={selectedSkills}
                  />
                ))}
              </div>
            </div>
          }
        />
        <DisplaySkills
          customClass={`bg-[#081C87] text-white`}
          skills={selectedSkills.map((value) => ({ value, label: value }))}
        />
      </section>
      <section className="mb-8">
        <TextareaForm
          type="text"
          label="About"
          placeholder="Tell us about yourself"
          name="about"
          requiredStatus={true}
          value={formData.about}
          onChange={(e) => handleInputChange("about", e.target.value)}
        />
      </section>
      {/* experience */}
      <TitleH2 title="Experience" />
      {experiences.map((experience, index) => (
        <section key={experience.id} className="mb-6 mt-6 px-3 pb-3 border-2 border-[#C9C9C9] rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Experience {index + 1}
            </h3>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 font-bold text-lg"
              >
                ×
              </button>
            )}
          </div>
          <InputForm
            type="text"
            label="Title"
            placeholder="Enter an experience title"
            name={`title_${index}`}
            requiredStatus={true}
            value={experience.title}
            onChange={(e) => handleExperienceChangeMultiple(index, "title", e.target.value)}
          />
          <TextareaForm
            type="text"
            label="Experience"
            placeholder="Tell us about your experience"
            name={`experience_${index}`}
            requiredStatus={true}
            value={experience.detail}
            onChange={(e) => handleExperienceChangeMultiple(index, "detail", e.target.value)}
          />
          <InputForm
            type="number"
            label="Year"
            placeholder="e.g. 2023"
            name={`year_${index}`}
            requiredStatus={true}
            value={experience.year}
            onChange={(e) => handleExperienceChangeMultiple(index, "year", parseInt(e.target.value))}
          />
        </section>
      ))}
      <div className="mb-6">
        <button
          type="button"
          onClick={addExperience}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add Another Experience
        </button>
      </div>
      {!submitted ? (
        <button type="submit" className="w-full" disabled={loading}>
          <DarkBlueButton type="submit" customClass="py-3 px-2 w-full">
            {loading ? "Registering..." : "Register"}
          </DarkBlueButton>
        </button>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 backdrop-blur-sm font-poppins">
          <SubmissionSuccess
            onClose={handleSubmissionSuccessClose}
            statusChecked={1}
          />
        </div>
      )}
      <ToastContainer />
    </form>
  );
};

export default FormRegisterMentor;
