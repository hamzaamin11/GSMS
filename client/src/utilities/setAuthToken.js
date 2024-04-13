import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = token;
    localStorage.setItem("Tokenjwt", JSON.stringify(token));
  } else {
    delete axios.defaults.headers.common["authorization"];
    localStorage.removeItem("Tokenjwt");
  }
};

export default setAuthToken;
