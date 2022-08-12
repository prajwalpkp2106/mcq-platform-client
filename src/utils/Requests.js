import axios from "axios";

const backend = axios.create({
  baseURL: `https://xenia-mcq-22.herokuapp.com/api`,
});

export const login = (data) => {
  return backend.post("/auth/login", data);
};

export const getUserByToken = (token) => {
  return backend.get("/auth/profile", {
    headers: { authorization: "Bearer " + token },
  });
};

export const getAllContests = () => {
  return backend.get("/contest/");
};

export const getInstructions = (id) => {
  return backend.get("/instruction/" + id);
};

export const getQuestions = () => {
  return backend.get("/");
};

export const getUserParticipations = (userId) => {
  return backend.get("/participant/user/" + userId);
};
