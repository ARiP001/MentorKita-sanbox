import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Fragments/Navbar";
import InputLogin from "../components/Elements/Input/inputLogin";
import DarkBlueButton from "../components/Elements/Button/darkBlueButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState({}, null, "/loginUser");
  }, []);

  const generateError = (error) => {
    toast.error(error, {
      position: "bottom-right",
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:4000/users/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Simpan token ke localStorage
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("userRole", result.role || "MENTEE");
        localStorage.setItem("userId", result.userId);
        
        // Redirect ke dashboard
        navigate("/");
        toast.success("Login berhasil!", {
          position: "bottom-right",
        });
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((error) => {
            generateError(error);
          });
        } else {
          generateError(result.message || "Login gagal");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      generateError("Terjadi kesalahan saat login. Pastikan server berjalan.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:flex-row">
        <div className="lg:w-[390px] lg:h-[844px] hidden lg:block">
          <figure>
            <img src="/images/Load.png" alt="Loading" />
          </figure>
        </div>
        <div className="lg:ml-auto lg:w-[890px] lg:h-[844px]">
          <div className="mt-[50px] pt-[20px] text-center">
            <h1 className="text-blue-800 my-[10px] text-[32px] font-bold">
              Login <span className="text-blue-400">here</span>
            </h1>
            <h2 className="w-[220px] mx-auto text-[16px] font-semibold ">
              Selamat datang kembali, senang berjumpa lagi dengan Anda!
            </h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mt-[30px]">
              <InputLogin name="email" type="email" placeholder="Email" />
            </div>
            <div className="mt-[25px]">
              <InputLogin name="password" type="password" placeholder="Password" />
            </div>
            <p className="text-[#081C87] text-[16px] ml-[225px] my-[15px] lg:ml-[475px]">
              Lupa password?
            </p>
            <div className="w-[350px] ml-2 mt-[30px]">
              <DarkBlueButton
                type="submit"
                customClass="py-3 px-2 w-[350px] h-[60px] lg:ml-[255px]"
              >
                Sign In
              </DarkBlueButton>
            </div>
          </form>
          <p className="text-[#081C87] text-[16px] font-bold text-center my-[20px]">
            <Link to="/registerUser">Create new account</Link>
          </p>
          <div className="mb-[20px]">
            <p className="text-[#081C87] text-[14px] font-semibold text-center my-[20px]">
              Or continue with
            </p>
            <section className="flex justify-center items-center">
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_google.png" alt="Google" className="w-[25px] h-[25px]" />
              </figure>
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_fb.png" alt="Facebook" className="w-[25px] h-[25px]" />
              </figure>
              <figure className="bg-gray-200 w-[60px] h-[40px] mx-[10px] rounded flex justify-center items-center">
                <img src="/images/logo_apple.png" alt="Apple" className="w-[25px] h-[25px]" />
              </figure>
            </section>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginUser;
