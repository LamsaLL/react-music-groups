import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  //fetch
  return fetch(API_URL + "all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserBoard = () => {
  return fetch(API_URL + "user", {
    method: "GET",
    headers: authHeader(),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getModeratorBoard = () => {
  return fetch(API_URL + "mod", {
    method: "GET",
    headers: authHeader(),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAdminBoard = () => {
  return fetch(API_URL + "admin", {
    method: "GET",
    headers: authHeader(),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
