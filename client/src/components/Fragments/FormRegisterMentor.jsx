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

const FormRegisterMentor = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleFormSubmit = (e) => {
    event.preventDefault();
    if (validateForm()) {
      // Your form submission logic here
      console.log("Form submitted!");
      console.log("Phone:", phone);
      console.log("Email:", email);
      console.log("Selected Skills:", selectedSkills);
      console.log("Selected Courses:", selectedCourses);
    }
    console.log("Succes Registration", reviewText);

    setSubmitted(true);
    setReviewText("");
  };
  const handleSubmissionSuccessClose = () => {
    setSubmitted(false);
    // onClose();
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

    // // Validate email
    // if (!/^\S+@\S+\.\w{2,}$/.test(email)) {
    //   setEmailError("");
    // } else {
    //   setEmailError("Masukkan email yang benar");
    //   isValid = false;
    // }

    // // Validate phone number
    // if (!/^\d{10,}$/.test(phone)) {
    //   setPhoneError("Masukkan no hp yang benar");
    //   isValid = false;
    // } else {
    //   setPhoneError("");
    // }

    return isValid;
  };

  // Handler untuk input telepon
  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value); // Update state input telepon
    validateForm(); // Panggil fungsi validasi secara real-time
  };

  // Handler untuk input email
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value); // Update state input email
    validateForm(); // Panggil fungsi validasi secara real-time
  };

  return (
    <form onSubmit={handleFormSubmit} className="font-poppins">
      {/* Nama */}
      <section className="mb-8">
        <InputForm
          type="text"
          label="Name"
          placeholder="Your Name"
          name="name"
          requiredStatus={true}
        />
      </section>
      {/* no telepon */}
      <section className="mb-8">
        <InputForm
          type="tel"
          label="Phone"
          placeholder="e.g. 0822xxxxxxxx"
          name="phone"
          requiredStatus={true}
          value={phone}
          onChange={handlePhoneChange}
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
          value={email}
          onChange={handleEmailChange}
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
        />
      </section>
      {/* location */}
      <section className="mb-8">
        <InputForm
          type="text"
          label="Location"
          placeholder="Your Location"
          name="location"
          requiredStatus={true}
          value={location}
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
        />
      </section>
      {/* experience */}
      <TitleH2 title="Experience" />
      <section className="mb-10 mt-6 px-3 pb-3 border-2 border-[#C9C9C9] rounded-md">
        <InputForm
          type="text"
          label="Title"
          placeholder="Enter an experience title"
          name="title"
          requiredStatus={true}
        />
        <TextareaForm
          type="text"
          label="Experience"
          placeholder="Tell us about your experience"
          name="experience"
          requiredStatus={true}
        />
        {/* <div className="mt-4 px-4">
          <DarkBlueButton type="submit" customClass="py-2 px-2 w-full bg-yellow-400 text-[#081C87]">
            Edit
          </DarkBlueButton>
        </div> */}
      </section>
      {!submitted ? (
        <button type="submit" className="w-full">
          <DarkBlueButton type="submit" customClass="py-3 px-2 w-full">
            Register
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
    </form>
  );
};

export default FormRegisterMentor;
