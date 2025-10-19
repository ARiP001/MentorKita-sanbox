import { useNavigate } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import InputLogin from "../components/Elements/Input/inputLogin";
import DarkBlueButton from "../components/Elements/Button/darkBlueButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterUser = () => {
  const navigate = useNavigate();

  const generateError = (error) => {
    toast.error(error, {
      position: "bottom-right",
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      fullName: event.target.fullname.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:8080/users/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((error) => {
            generateError(error);
          });
        } else {
          generateError(result.message);
        }
      }
    } catch (error) {
      generateError("An error occurred while registering.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:flex-row">
        <div className="lg:w-[390px] lg:h-[844px] hidden lg:block">
          <figure>
            <img src="/images/Load.png" alt="" />
          </figure>
        </div>
        <div className="lg:ml-auto lg:w-[890px] lg:h-[844px]">
          <div className="mt-[70px] text-center">
            <h1 className="text-blue-800 my-[10px] text-[32px] font-bold">
              Create <span className="text-blue-400">Account</span>
            </h1>
            <h2 className="w-[220px] mx-auto text-[16px] font-semibold">
              Silahkan buat akun baru
            </h2>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mt-[30px]">
              <InputLogin name="email" type="email" placeholder="Email" />
            </div>
            <div className="mt-[25px]">
              <InputLogin name="fullname" type="text" placeholder="Nama Lengkap" />
            </div>
            <div className="mt-[25px]">
              <InputLogin name="password" type="password" placeholder="Password" />
            </div>
            <div className="mt-[25px]">
              <InputLogin name="confirmPassword" type="password" placeholder="Confirm Password" />
            </div>
            <div className="w-[350px] ml-2 mt-[30px]">
              <DarkBlueButton
                type="submit"
                customClass="py-3 px-2 w-[350px] h-[60px] lg:ml-[255px]"
              >
                Sign Up
              </DarkBlueButton>
            </div>
          </form>
          <div className="mt-[50px] mb-[20px]">
            <p className="text-[#081C87] text-[14px] font-semibold text-center my-[20px]">
              Or continue with
            </p>
            <section className="flex justify-center items-center">
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_google.png" alt="google" className="w-[25px] h-[25px]" />
              </figure>
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_fb.png" alt="facebook" className="w-[25px] h-[25px]" />
              </figure>
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_apple.png" alt="apple" className="w-[25px] h-[25px]" />
              </figure>
            </section>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterUser;
