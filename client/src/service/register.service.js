
import axios from "axios";

export const register = async (data, callback) => {
  await axios
    .post("http://localhost:4000/users/registerUser", data, {
      withCredentials: true,
    })
    .then(async (res) => {
      await callback(true, res);
    })
    .catch((err) => {
      console.error(err); // Menampilkan error di console log
      callback(false, err);
    });
};
