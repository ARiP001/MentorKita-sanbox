import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const becomeAMentor = async (data, callback) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      callback(false, { message: "You must be logged in to become a mentor" });
      return;
    }

    const response = await axios.post(
      `${API_BASE_URL}/users/BecomeAMentor`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    callback(true, response);
  } catch (error) {
    callback(false, error);
  }
};
