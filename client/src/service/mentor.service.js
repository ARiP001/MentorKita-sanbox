import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const getMentorDetail = async (id, callback) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/mentorDetail/${id}`);
    callback(true, response);
  } catch (error) {
    callback(false, error);
  }
};

export const getAllMentors = async (callback) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/getAllMentors`);
    callback(true, response);
  } catch (error) {
    callback(false, error);
  }
};
