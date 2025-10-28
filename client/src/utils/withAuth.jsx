import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
          setIsAuth(false);
          setIsLoading(false);
          return;
        }

        try {
          // Verifikasi token dengan backend
          const response = await axios.get("http://localhost:4000/users/profileUser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.status === 200) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userId");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          setIsAuth(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
        }
        
        setIsLoading(false);
      };

      checkAuth();
    }, []);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }

    if (!isAuth) {
      navigate("/loginUser");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
