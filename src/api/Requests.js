import axios from "axios";

const backend = axios.create({
  baseURL: ``
});


export const login = (data) => {
    return backend.post("/auth/login", data);
  };
export const getUserByToken = (token) => {
    return backend.get("/auth/profile", {
      headers: { authorization: token },
    });
};

