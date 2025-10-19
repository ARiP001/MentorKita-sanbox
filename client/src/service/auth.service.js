import axios from "axios";

export const login = async (data, callback) => {
    await axios.post("http://localhost:8000/users/loginUser", data, {withCredentials: true})
    .then(async (res) => {
        await callback(true, res)
    })
    .catch((err) =>{
        callback(true, err)
    })
}